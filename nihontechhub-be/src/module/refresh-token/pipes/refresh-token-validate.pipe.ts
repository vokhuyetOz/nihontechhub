import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
  BASE_REFRESH_TOKEN_ERROR,
  BASE_USER_ERROR,
  REFRESH_TOKEN_ERROR,
} from 'src/common/errors';
import { DateHelper } from 'src/common/helper';
import { VALIDATE_BASE_KEY } from 'src/common/metadata/base-validate.metadata';
import { TBaseMetadata, TValidateRefreshToken } from 'src/common/types';
import { User } from 'src/module/user/entities/user.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
import { RefreshTokenService } from '../refresh-token.service';

@Injectable()
export class RefreshTokenValidatePipe implements PipeTransform {
  constructor(
    private readonly refreshTokenService: RefreshTokenService,
    // private readonly userService: UserService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async validateAuthor(user?: User): Promise<void> {
    if (!user) {
      throw new NotFoundException(BASE_USER_ERROR.NOT_FOUND.message, {
        description: BASE_USER_ERROR.NOT_FOUND.code,
      });
    }
    if (!user?.active) {
      throw new BadRequestException(BASE_USER_ERROR.NOT_ACTIVE_RECORD.message, {
        description: BASE_USER_ERROR.NOT_ACTIVE_RECORD.code,
      });
    }
    if (user?.deletedAt) {
      throw new BadRequestException(
        BASE_USER_ERROR.SOFT_DELETE_FAILED.message,
        {
          description: BASE_USER_ERROR.SOFT_DELETE_FAILED.code,
        },
      );
    }
  }

  async transform(value: any) {
    const metadata: TBaseMetadata<TValidateRefreshToken, RefreshToken> =
      this.request[VALIDATE_BASE_KEY];
    if (!metadata) {
      return value;
    }
    const { mapTypes, keyFind } = metadata;
    const refreshToken: RefreshToken = await this.refreshTokenService.getOne({
      filter: [{ field: keyFind, operator: '$eq', value: value[`${keyFind}`] }],
      join: [{ field: 'user' }],
    });

    if (mapTypes.has('exists') && !refreshToken) {
      const { code, message } = BASE_REFRESH_TOKEN_ERROR.NOT_FOUND;
      throw new NotFoundException(message, { description: code });
    }
    if (mapTypes.has('is_used') && refreshToken?.isUsed) {
      const { code, message } = REFRESH_TOKEN_ERROR.IS_USED;
      throw new BadRequestException(message, { description: code });
    }
    const isExpired = DateHelper.compareDates(refreshToken?.expiredAt);
    if (mapTypes.has('is_expired') && !isExpired) {
      const { code, message } = REFRESH_TOKEN_ERROR.EXPIRED;
      throw new BadRequestException(message, { description: code });
    }
    if (mapTypes.has('validate_author')) {
      await this.validateAuthor(refreshToken?.user);
    }

    this.request['refreshToken'] = refreshToken;
    return value;
  }
}
