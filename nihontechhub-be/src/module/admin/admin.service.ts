import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ADMIN_ERROR, AUTH_ERROR, BASE_ADMIN_ERROR } from 'src/common/errors';
import { DateHelper, PasswordHelper } from 'src/common/helper';
import {
  JwtPayload,
  TCustomParsedRequestParams,
  TUpdatePassWord,
} from 'src/common/types';
import { BaseMySqlService } from '../../common/services/base-mysql.service';
import { Admin } from './entities/admin.entities';

@Injectable()
export class AdminService extends BaseMySqlService<Admin> {
  constructor(
    @InjectRepository(Admin)
    private readonly repo: EntityRepository<Admin>,
  ) {
    super(repo, BASE_ADMIN_ERROR);
  }

  // Update only password for user
  async selfUpdatePassword(admin: Admin, dto: TUpdatePassWord): Promise<Admin> {
    const isMatchWithOldPassWord = await PasswordHelper.validatePasswordMatch(
      admin.password,
      dto.oldPassword,
    );
    if (!isMatchWithOldPassWord) {
      throw new BadRequestException(ADMIN_ERROR.NOT_MATCH_PASSWORD.message, {
        description: ADMIN_ERROR.NOT_MATCH_PASSWORD.code,
      });
    }
    const result = await this.updatePassword(
      {
        filter: [{ field: 'id', operator: 'eq', value: admin.id }],
      },
      dto.newPassword,
    );

    return result;
  }

  async updatePassword(
    condition: Partial<TCustomParsedRequestParams<Admin>>,
    password: string,
  ): Promise<Admin> {
    const data: Partial<Admin> = {
      passwordChangedAt: DateHelper.currentDate(),
      password,
    };
    try {
      const result = await this.updateOne(condition, data);
      return result;
    } catch (e) {
      const { code, message } = ADMIN_ERROR.UPDATE_PASSWORD_FAILED;
      throw new BadRequestException(message, {
        description: code,
      });
    }
  }

  async validateWithJWTPayload(payload: JwtPayload): Promise<Admin> {
    const { id } = payload;

    const { NOT_FOUND, NOT_ACTIVE_RECORD, SOFT_DELETE_RECORD } =
      BASE_ADMIN_ERROR;

    const { SESSION_EXPIRED } = AUTH_ERROR;

    const admin = await this.getOne({
      filter: [{ field: 'id', operator: 'eq', value: id }],
      withDeleted: true,
    });

    if (!admin)
      throw new BadRequestException(NOT_FOUND.message, {
        description: NOT_ACTIVE_RECORD.code,
      });

    if (!admin?.active)
      throw new BadRequestException(NOT_ACTIVE_RECORD.message, {
        description: NOT_ACTIVE_RECORD.code,
      });

    if (admin?.deletedAt)
      throw new BadRequestException(SOFT_DELETE_RECORD.message, {
        description: SOFT_DELETE_RECORD.code,
      });
    const isPasswordChanged = PasswordHelper.validatePassWordHasBeenChanged(
      admin.passwordChangedAt,
      payload.iat,
    );

    if (!isPasswordChanged) {
      throw new UnauthorizedException(SESSION_EXPIRED.message, {
        description: SESSION_EXPIRED.code,
      });
    }

    return admin;
  }
}
