import { AccessAdminRole } from '@common/decorators';
import { AccessRole } from '@common/decorators/role.decorator';
import { BaseIdDTO } from '@common/dto';
import { EAdminRole, EAuthorRole } from '@common/enums';
import { SwaggerHelper } from '@common/helper';
import { TCustomCrudRequest } from '@common/types';
import { ParsedRequest } from '@dataui/crud';
import { AdminService } from '@module/admin/admin.service';
import { UpdateAdminDTO } from '@module/admin/dto/update-admin.dto';
import { Admin } from '@module/admin/entities/admin.entities';
import { AdminRoleGuard } from '@module/admin/guard/admin-role.guard';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(AdminRoleGuard)
@ApiTags('Management-Admin')
@Controller({
  version: '1',
  path: 'management-admin',
})
export class ManagementAdminController {
  constructor(private readonly service: AdminService) {
    SwaggerHelper.BaseQueryParamsMetadata(Admin, this.getMany);
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.ADMIN)
  @AccessAdminRole(EAdminRole.SUPER_ADMIN)
  @Get('bulk')
  @HttpCode(HttpStatus.OK)
  async getMany(@ParsedRequest() req: TCustomCrudRequest<Admin>) {
    const { parsed } = req;
    return this.service.getMany(parsed);
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.ADMIN)
  @AccessAdminRole(EAdminRole.SUPER_ADMIN)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateAdmin(@Param() param: BaseIdDTO, @Body() dto: UpdateAdminDTO) {
    const admin = await this.service.updateOne(
      {
        filter: [
          {
            field: 'id',
            operator: 'eq',
            value: param.id,
          },
        ],
      },
      dto,
    );
    return admin;
  }
}
