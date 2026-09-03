import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EIncrementType } from 'src/common/enums';
import { BASE_VERIFY_ACCOUNT_ERROR } from 'src/common/errors';
import { DateHelper, RandomHelper } from 'src/common/helper';
import {
  TCreateVerifyOtpResponse,
  TCustomParsedRequestParams,
} from 'src/common/types';
import { BaseMySqlService } from '../../common/services/base-mysql.service';
import { User } from '../user/entities/user.entity';
import { VerifyAccount } from './entities/verify-account.entity';

@Injectable()
export class VerifyAccountService extends BaseMySqlService<VerifyAccount> {
  constructor(
    @InjectRepository(VerifyAccount)
    private readonly repo: EntityRepository<VerifyAccount>,
    private readonly configService: ConfigService,
  ) {
    super(repo, BASE_VERIFY_ACCOUNT_ERROR);
  }

  //create OTP
  createVerifyAccountOTP(): TCreateVerifyOtpResponse {
    const otp = RandomHelper.randomOtp(1, 999999);
    const configExpiredHour = parseInt(
      this.configService.get('cfg.auth.activeAccountExpiresIn'),
    );

    const expiryDate = DateHelper.increaseDate(
      configExpiredHour,
      EIncrementType.MINUTE,
    );

    return {
      otp,
      expiryDate,
    };
  }

  //save verify OTP
  async saveVerifyAccountOtp(user: User): Promise<VerifyAccount> {
    const { otp, expiryDate } = this.createVerifyAccountOTP();
    const data: Partial<VerifyAccount> = {
      email: user.email,
      otp,
      expiredAt: expiryDate,
      isUsed: false,
      user,
    };

    const result: VerifyAccount = await this.updateOrInsert(data, {
      filter: [{ field: 'user', operator: '$eq', value: user.id }],
    });

    return result;
  }

  //invalidate OTP
  async handleInvalidate(
    condition: Partial<TCustomParsedRequestParams<VerifyAccount>>,
  ): Promise<VerifyAccount> {
    const data = { isUsed: true };
    const result = await this.updateOne(condition, data);
    return result;
  }
}
