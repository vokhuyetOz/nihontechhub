import { ParsedRequestParams } from '@dataui/crud-request';
import { Injectable } from '@nestjs/common';
import { EAuthorRole } from 'src/common/enums';
import { AuthorHelper } from 'src/common/helper';
import { TAuthor, TCustomParsedRequestParams } from 'src/common/types';
import { AdminService } from '../admin/admin.service';
import { DeviceTokenService } from '../device-token/device-token.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { ResetPassword } from '../reset-password/entities/reset-password.entity';
import { ResetPasswordService } from '../reset-password/reset-password.service';
import { UserService } from '../user/user.service';
import { VerifyAccountService } from '../verify-account/verify-account.service';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { ResetPassWordDTO } from './dto/reset-password.dto';
import { User } from '../user/entities/user.entity';
import { Admin } from '../admin/entities/admin.entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly refreshService: RefreshTokenService,
    private readonly resetPasswordService: ResetPasswordService,
    private readonly verifyAccountService: VerifyAccountService,
    private readonly deviceTokenService: DeviceTokenService,
  ) {}

  async logOut(userId: string, deviceId: string): Promise<void> {
    await Promise.all([
      this.refreshService.softDelete({
        filter: [
          {
            field: 'user_id',
            operator: 'eq',
            value: userId,
          },
        ],
      }),

      this.verifyAccountService.softDelete({
        filter: [
          {
            field: 'user_id',
            operator: 'eq',
            value: userId,
          },
        ],
      }),

      this.resetPasswordService.softDelete({
        filter: [
          {
            field: 'user_id',
            operator: 'eq',
            value: userId,
          },
        ],
      }),

      this.deviceTokenService.softDelete({
        filter: [
          { field: 'authorId', operator: '$eq', value: userId },
          { field: 'deviceId', operator: '$eq', value: deviceId },
        ],
      }),
    ]);
  }

  async getAuthorByAuthorRoleAndEmail({
    authorRole,
    email,
  }: {
    email: string;
    authorRole: EAuthorRole;
  }): Promise<TAuthor> {
    const parsed: Partial<ParsedRequestParams> = {
      filter: [
        {
          field: 'email',
          operator: 'eq',
          value: email,
        },
      ],
    };
    if (authorRole === EAuthorRole.USER) {
      return this.userService.getOne(parsed);
    }
    if (authorRole === EAuthorRole.ADMIN) {
      return this.adminService.getOne(parsed);
    }
    return this.userService.getOne(parsed);
  }

  //forgot password
  async forgotPassword(
    body: ForgotPasswordDTO,
  ): Promise<{ author: TAuthor; otp: string }> {
    const parsed: Partial<TCustomParsedRequestParams<ResetPassword>> = {
      filter: [
        {
          field: 'email',
          operator: 'eq',
          value: body.email,
        },
      ],
    };
    const author = await this.getAuthorByAuthorRoleAndEmail(body);

    const { otp, expiryDate } =
      this.verifyAccountService.createVerifyAccountOTP();

    const data: Partial<ResetPassword> = {
      email: body.email,
      otp,
      expiredAt: expiryDate,
      isUsed: false,
      ...AuthorHelper.getAddRelation(author),
    } as Partial<ResetPassword>;

    const resetPassword = await this.resetPasswordService.updateOrInsert(
      data,
      parsed,
    );

    return {
      author,
      otp: resetPassword.otp,
    };
  }

  async handleUpdateAuthorPassword(author: TAuthor, newPassword: string) {
    if (author instanceof User) {
      return this.userService.updatePassword(
        {
          filter: [{ field: 'id', operator: '$eq', value: author.id }],
        },
        newPassword,
      );
    }
    if (author instanceof Admin) {
      return this.adminService.updatePassword(
        {
          filter: [{ field: 'id', operator: '$eq', value: author.id }],
        },
        newPassword,
      );
    }
  }

  //reset password for user
  async resetPassword(body: ResetPassWordDTO) {
    const { password, email, otp } = body;
    const resetPassword =
      await this.resetPasswordService.handleValidateResetPasswordOTP({
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
        join: [{ field: 'admin' }, { field: 'user' }],
      });

    const author =
      this.resetPasswordService.getAuthorFromResetPassword(resetPassword);

    await this.handleUpdateAuthorPassword(author, password);
    return this.resetPasswordService.handleInvalidate({
      filter: [{ field: 'id', operator: '$eq', value: resetPassword.id }],
    });
  }
}
