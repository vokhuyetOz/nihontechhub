import { CurrentAuthor } from '@common/decorators';
import { AccessRole } from '@common/decorators/role.decorator';
import { BaseUpdatePasswordDTO } from '@common/dto';
import { EAuthorRole } from '@common/enums';
import { DateHelper, SwaggerHelper } from '@common/helper';
import { TCustomCrudRequest } from '@common/types';
import { ParsedRequest } from '@dataui/crud';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { UpdateAdminDTO } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entities';

@ApiTags('Admin')
@Controller({
  version: '1',
  path: 'admin',
})
export class AdminController {
  constructor(private readonly service: AdminService) {
    SwaggerHelper.BaseQueryParamsMetadata(Admin, this.getMe);
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.ADMIN)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getMe(
    @ParsedRequest() req: TCustomCrudRequest<Admin>,
    @CurrentAuthor('id') id: string,
  ) {
    const { parsed } = req;
    parsed.filter = [
      ...parsed.filter,
      {
        field: 'id',
        operator: 'eq',
        value: id,
      },
    ];
    const user = await this.service.getOne(parsed);
    return user;
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.ADMIN)
  @Patch('password')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @CurrentAuthor() admin: Admin,
    @Body() body: BaseUpdatePasswordDTO,
  ) {
    const result = await this.service.selfUpdatePassword(admin, body);
    return result;
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.ADMIN)
  @Patch('me')
  @HttpCode(HttpStatus.OK)
  async updateMe(
    @CurrentAuthor('id') id: string,
    @Body() dto: Partial<UpdateAdminDTO>,
  ) {
    const user = await this.service.updateOne(
      {
        filter: [
          {
            field: 'id',
            operator: 'eq',
            value: id,
          },
        ],
      },
      dto,
    );
    return user;
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.ADMIN)
  @Patch('read-notification')
  @HttpCode(HttpStatus.OK)
  async readNotification(@CurrentAuthor('id') id: string) {
    const result = await this.service.updateOne(
      { filter: [{ field: 'id', operator: 'eq', value: id }] },
      { lastReadNotificationAt: DateHelper.currentDate() },
    );

    return result;
  }
}
