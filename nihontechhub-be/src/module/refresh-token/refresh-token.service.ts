import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { BASE_REFRESH_TOKEN_ERROR } from 'src/common/errors';
import { AuthorHelper, EncryptHelper } from 'src/common/helper';
import {
  JwtPayload,
  TAuthor,
  TCreateRefreshToken,
  TRenewTokenResponse,
  TSaveRefreshToken,
} from 'src/common/types';
import { EAuthorRole, EIncrementType } from '../../common/enums';
import { BaseMySqlService } from '../../common/services/base-mysql.service';
import { UserService } from '../user/user.service';
import { DateHelper } from './../../common/helper/date.helper';
import { RenewRefreshTokenDTO } from './dto/renew-refresh-token.dto';
import { RefreshToken } from './entities/refresh-token.entity';

@Injectable()
export class RefreshTokenService extends BaseMySqlService<RefreshToken> {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly repo: EntityRepository<RefreshToken>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    super(repo, BASE_REFRESH_TOKEN_ERROR);
  }

  //create access token
  createAccessToken(data: JwtPayload): string {
    const expiresIn = this.configService.get('cfg.auth.expiresIn');
    const secretOrKey = this.configService.get('cfg.auth.secretOrKey');
    const payload: JwtPayload = data;

    const accessToken = this.jwtService.sign(payload, {
      privateKey: secretOrKey,
      expiresIn,
    });

    return accessToken;
  }

  // Create refresh token
  createRefreshToken(data: string): TCreateRefreshToken {
    const rawToken: string = EncryptHelper.createRawData(data);
    const hashedToken = EncryptHelper.hashTokenByCrypto(rawToken);

    const configExpiredDate: number = parseInt(
      this.configService.get('cfg.auth.refreshTokenExpiresIn'),
    );

    const expiryDate: Date = DateHelper.increaseDate(
      configExpiredDate,
      EIncrementType.DATE,
    );

    return { refreshToken: hashedToken, expiryDate: expiryDate };
  }

  async saveRefreshToken(
    data: TSaveRefreshToken,
    author: TAuthor,
  ): Promise<string> {
    let refreshToken: TCreateRefreshToken;
    if (data?.email) {
      refreshToken = this.createRefreshToken(data?.email);
    }
    if (data?.idSocialNetwork) {
      refreshToken = this.createRefreshToken(data?.idSocialNetwork);
    }
    if (!data?.email && !data?.idSocialNetwork) {
      const { code, message } = BASE_REFRESH_TOKEN_ERROR.CREATE_FAILED;
      throw new BadRequestException(message, { description: code });
    }
    const relation = AuthorHelper.getAddRelation(author);
    const dto: Partial<RefreshToken> = {
      email: data?.email,
      token: refreshToken.refreshToken,
      expiredAt: refreshToken.expiryDate,
      isUsed: false,
      idSocialNetwork: data?.idSocialNetwork,
      authorRole: AuthorHelper.getEAuthorRole(author),
      ...relation,
    };
    const result = await super.createOne(dto);
    return result.token;
  }

  private getAuthorFromRefreshToken(refreshToken: RefreshToken): TAuthor {
    return {
      [EAuthorRole.USER]: refreshToken?.user,
      [EAuthorRole.ADMIN]: refreshToken?.admin,
    }[refreshToken.authorRole];
  }

  async renewToken(body: RenewRefreshTokenDTO): Promise<TRenewTokenResponse> {
    const { token, deviceId } = body;
    const invalidateRefreshToken: RefreshToken = await super.updateOne(
      {
        filter: [{ field: 'token', operator: '$eq', value: token }],
        join: [{ field: 'admin' }, { field: 'user' }],
      },
      { isUsed: true },
    );

    const author = this.getAuthorFromRefreshToken(invalidateRefreshToken);

    const newAccessToken: string = this.createAccessToken({
      email: author.email,
      id: author.id,
      provider: author.provider,
      device_id: deviceId,
      authorRole: invalidateRefreshToken.authorRole,
    });
    //save refresh token
    const refreshToken: string = await this.saveRefreshToken(
      {
        email: author.email,
      },
      author,
    );
    return {
      token: newAccessToken,
      refreshToken: refreshToken,
    };
  }
}
