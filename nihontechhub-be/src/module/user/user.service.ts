import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EAuthProvider } from 'src/common/enums';
import { AUTH_ERROR, BASE_USER_ERROR, USER_ERROR } from 'src/common/errors';
import {
  JwtPayload,
  TCustomParsedRequestParams,
  TUpdatePassWord,
} from 'src/common/types';
import { BaseMySqlService } from '../../common/services/base-mysql.service';
import { ActiveAccountOtpDTO } from '../register/dto/active-account.dto';
import { VerifyAccountService } from '../verify-account/verify-account.service';
import { DateHelper } from './../../common/helper/date.helper';
import { PasswordHelper } from './../../common/helper/password.helper';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends BaseMySqlService<User> {
  constructor(
    @InjectRepository(User)
    private readonly repo: EntityRepository<User>,
    private readonly verifyAccountService: VerifyAccountService,
    protected readonly em: EntityManager,
  ) {
    super(repo, BASE_USER_ERROR);
  }

  //VALIDATE USER
  validateEqualProvider(
    provider: EAuthProvider,
    compareWithProvider: EAuthProvider,
  ): boolean {
    return provider === compareWithProvider;
  }

  isUserNotDeletedAtOrInactive(
    deletedAt: Date | null,
    active: boolean,
  ): boolean {
    return !deletedAt && active;
  }

  async updatePassword(
    condition: Partial<TCustomParsedRequestParams<User>>,
    password: string,
  ): Promise<User> {
    const data: Partial<User> = {
      passwordChangedAt: DateHelper.currentDate(),
      password,
    };
    try {
      const result = await this.updateOne(condition, data);
      return result;
    } catch (e) {
      const { code, message } = USER_ERROR.UPDATE_PASSWORD_FAILED;
      throw new BadRequestException(message, {
        description: code,
      });
    }
  }

  // Update only password for user
  async selfUpdatePassword(user: User, dto: TUpdatePassWord): Promise<User> {
    const isMatchWithOldPassWord = await PasswordHelper.validatePasswordMatch(
      user.password,
      dto.oldPassword,
    );
    if (!isMatchWithOldPassWord) {
      throw new BadRequestException(USER_ERROR.NOT_MATCH_PASSWORD.message, {
        description: USER_ERROR.NOT_MATCH_PASSWORD.code,
      });
    }
    const result = await this.updatePassword(
      {
        filter: [{ field: 'id', operator: 'eq', value: user.id }],
      },
      dto.newPassword,
    );

    return result;
  }

  //HANDLER
  //active account for register with email and OTP
  async userActiveAccount(dto: ActiveAccountOtpDTO): Promise<User> {
    const { email, otp } = dto;
    const [result] = await Promise.all([
      super.active({
        filter: [
          {
            field: 'email',
            operator: 'eq',
            value: email,
          },
        ],
      }),
      this.verifyAccountService.handleInvalidate({
        filter: [
          {
            field: 'email',
            operator: 'eq',
            value: email,
          },
          {
            field: 'otp',
            operator: 'eq',
            value: otp,
          },
        ],
      }),
    ]);
    return result;
  }

  async validateUserWithJWTPayload(payload: JwtPayload): Promise<User> {
    const { id, provider } = payload;
    const user = await this.getOne({
      filter: [{ field: 'id', operator: 'eq', value: id }],
      withDeleted: true,
    });

    const isExistProvider = this.validateEqualProvider(provider, user.provider);

    if (!isExistProvider) {
      throw new BadRequestException(
        USER_ERROR.ACCOUNT_NOT_SUPPORT_PROVIDER.message,
        {
          description: USER_ERROR.ACCOUNT_NOT_SUPPORT_PROVIDER.code,
        },
      );
    }

    const isUserHasBeenEnable = this.isUserNotDeletedAtOrInactive(
      user?.deletedAt,
      user.active,
    );
    if (!isUserHasBeenEnable) {
      throw new BadRequestException(BASE_USER_ERROR.NOT_ACTIVE_RECORD.message, {
        description: BASE_USER_ERROR.NOT_ACTIVE_RECORD.code,
      });
    }

    const isPasswordChanged = PasswordHelper.validatePassWordHasBeenChanged(
      user.passwordChangedAt,
      payload.iat,
    );

    if (!isPasswordChanged) {
      throw new UnauthorizedException(AUTH_ERROR.SESSION_EXPIRED.message, {
        description: AUTH_ERROR.SESSION_EXPIRED.code,
      });
    }

    return user;
  }

  // get details user if exist condition , if exist validate is equals provider
  async getDetailsUserIfExistAndValidateProvider(
    condition: Partial<TCustomParsedRequestParams<User>>,
    provider: EAuthProvider,
  ) {
    const user = await super.getOneWithoutValidate(condition);
    if (!user) return;
    if (provider !== user?.provider)
      throw new BadRequestException(
        USER_ERROR.ACCOUNT_NOT_SUPPORT_PROVIDER.message,
        {
          description: USER_ERROR.ACCOUNT_NOT_SUPPORT_PROVIDER.code,
        },
      );
    return user;
  }
}
