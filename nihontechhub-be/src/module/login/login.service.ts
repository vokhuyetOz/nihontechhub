import { AuthorHelper } from '@common/helper';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EAuthorRole } from 'src/common/enums';
import { USER_ERROR } from 'src/common/errors';
import { TAuthor } from 'src/common/types';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { PasswordHelper } from './../../common/helper/password.helper';
import { LoginWithEmailPasswordDTO } from './dto/login-with-email-password.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UserService,
    private readonly refreshService: RefreshTokenService,
  ) {}

  //handle login
  async createTokenForLoginWithEmailPassword(
    author: TAuthor,
    dto: LoginWithEmailPasswordDTO,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const isPasswordMatching = await PasswordHelper.validatePasswordMatch(
      dto.password,
      author?.password,
    );

    if (!isPasswordMatching) {
      throw new BadRequestException(USER_ERROR.NOT_MATCH_PASSWORD.message, {
        description: USER_ERROR.NOT_MATCH_PASSWORD.code,
      });
    }

    const accessToken: string = this.refreshService.createAccessToken({
      email: author.email,
      id: author.id,
      provider: author.provider,
      device_id: dto.deviceId,
      authorRole: AuthorHelper.getEAuthorRole(author),
    });

    const refreshToken: string = await this.refreshService.saveRefreshToken(
      {
        email: author.email,
      },
      author,
    );

    return { accessToken, refreshToken };
  }

  async userLoginWithEmailPassword(dto: LoginWithEmailPasswordDTO) {
    const { email, provider } = dto;

    const user = await this.userService.getOne({
      filter: [
        {
          field: 'email',
          operator: 'eq',
          value: email,
        },
        {
          field: 'provider',
          operator: 'eq',
          value: provider,
        },
      ],
    });

    const { accessToken, refreshToken } =
      await this.createTokenForLoginWithEmailPassword(user, dto);

    const result = {
      id: user.id,
      email: user.email,
      provider: user.provider,
      role: user.role,
      accessToken,
      refreshToken,
    };

    return result;
  }

  //create login with email
  async createTokenForLoginWithSocials(user: User, device_id: string) {
    const { idSocialNetwork, id, role, provider, email } = user;
    const accessToken: string = this.refreshService.createAccessToken({
      id_social_network: idSocialNetwork,
      id,
      provider,
      device_id,
      authorRole: EAuthorRole.USER,
    });

    const refreshToken = await this.refreshService.saveRefreshToken(
      {
        idSocialNetwork,
      },
      user,
    );

    const result = {
      id,
      email: email ?? null,
      token: accessToken,
      role,
      refreshToken,
    };

    return result;
  }
}
