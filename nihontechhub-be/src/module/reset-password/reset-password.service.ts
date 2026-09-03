import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  BASE_RESET_PASSWORD_ERROR,
  RESET_PASSWORD_ERROR,
} from 'src/common/errors';
import { BaseMySqlService } from '../../common/services/base-mysql.service';
import { TAuthor, TCustomParsedRequestParams } from '../../common/types';
import { DateHelper } from './../../common/helper/date.helper';
import { ResetPassword } from './entities/reset-password.entity';
import { EAuthorRole } from 'src/common/enums';

@Injectable()
export class ResetPasswordService extends BaseMySqlService<ResetPassword> {
  constructor(
    @InjectRepository(ResetPassword)
    private readonly repo: EntityRepository<ResetPassword>,
  ) {
    super(repo, BASE_RESET_PASSWORD_ERROR);
  }

  getAuthorFromResetPassword(resetPassword: ResetPassword): TAuthor {
    return {
      [EAuthorRole.USER]: resetPassword?.user,
      [EAuthorRole.ADMIN]: resetPassword?.admin,
    }[resetPassword.authorRole];
  }

  async handleValidateResetPasswordOTP(
    condition: Partial<TCustomParsedRequestParams<ResetPassword>>,
  ): Promise<ResetPassword> {
    const resetPassword = await this.getOne(condition);

    if (resetPassword.isUsed) {
      const { code, message } = RESET_PASSWORD_ERROR.IS_USED;
      throw new BadRequestException(message, {
        description: code,
      });
    }

    const isExpired = DateHelper.compareDates(resetPassword.expiredAt);
    if (!isExpired) {
      const { code, message } = RESET_PASSWORD_ERROR.EXPIRED;
      throw new BadRequestException(message, {
        description: code,
      });
    }

    return resetPassword;
  }

  //invalid
  async handleInvalidate(
    condition: Partial<TCustomParsedRequestParams<ResetPassword>>,
  ) {
    const data = { isUsed: true };
    const result = await this.updateOne(condition, data);
    return result;
  }
}
