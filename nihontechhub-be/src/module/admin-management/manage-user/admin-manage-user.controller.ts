import { AccessRole } from '@common/decorators/role.decorator';
import { BaseIdDTO } from '@common/dto';
import { EAuthorRole } from '@common/enums';
import { SwaggerHelper } from '@common/helper';
import { BaseValidateInterceptor } from '@common/interceptor/base-validate.interceptor';
import { ValidateBase } from '@common/metadata/base-validate.metadata';
import { UserValidatePipe } from '@common/pipes';
import { TCustomCrudRequest, TValidateUser } from '@common/types';
import { ParsedRequest } from '@dataui/crud';
import {
  AdminCreateUserDTO,
  CreateManyUserDTO,
  UpdateUserDTO,
} from '@module/user/dto';
import { User } from '@module/user/entities/user.entity';
import { UserService } from '@module/user/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin-manage-user')
@Controller({
  version: '1',
  path: 'admin/manage-user',
})
@UseInterceptors(BaseValidateInterceptor)
export class AdminManageUserController {
  constructor(private readonly userService: UserService) {
    SwaggerHelper.BaseQueryParamsMetadata(User, this.getMany);
    SwaggerHelper.BaseQueryParamsMetadata(User, this.getOne);
  }

  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(new EntityPolicyHandler(Action.Read, User))
  @ApiBearerAuth()
  @AccessRole(EAuthorRole.ADMIN)
  @Get('bulk')
  @HttpCode(HttpStatus.OK)
  async getMany(@ParsedRequest() req: TCustomCrudRequest<User>) {
    const { parsed } = req;
    return this.userService.getMany(parsed);
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.ADMIN)
  // @ValidateBase<TValidateUser, User>({
  //   types: ['exists', 'active', 'deleted'],
  //   keyFind: 'id',
  // })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(
    @ParsedRequest() req: TCustomCrudRequest<User>,
    @Param(UserValidatePipe) param: BaseIdDTO,
  ) {
    const { parsed } = req;
    const id = param.id;
    parsed.filter = [
      {
        field: 'id',
        operator: 'eq',
        value: id,
      },
    ];
    const result = await this.userService.getOne(parsed);

    return result;
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.ADMIN)
  @Post('bulk')
  @HttpCode(HttpStatus.CREATED)
  async createMany(@Body() dto: CreateManyUserDTO) {
    const { users } = dto;
    const result = await this.userService.createMany(users);

    return result;
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.ADMIN)
  @ValidateBase<TValidateUser, User>({
    types: ['exists'],
    keyFind: 'email',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOne(@Body(UserValidatePipe) dto: AdminCreateUserDTO) {
    const result = await this.userService.createOne(dto);
    return result;
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.ADMIN)
  @ValidateBase<TValidateUser, User>({
    types: ['exists', 'active', 'deleted'],
    keyFind: 'id',
  })
  @Patch('deactivate/:id')
  @HttpCode(HttpStatus.OK)
  async deactivateAccount(@Param(UserValidatePipe) param: BaseIdDTO) {
    const result = await this.userService.deactivate({
      filter: [{ field: 'id', operator: 'eq', value: param.id }],
    });
    return result;
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.ADMIN)
  @ValidateBase<TValidateUser, User>({
    types: ['exists'],
    keyFind: 'id',
  })
  @Patch('active/:id')
  @HttpCode(HttpStatus.OK)
  async activeAccount(@Param(UserValidatePipe) param: BaseIdDTO) {
    const result = await this.userService.active({
      filter: [{ field: 'id', operator: 'eq', value: param.id }],
    });
    return result;
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.ADMIN)
  @ValidateBase<TValidateUser, User>({
    types: ['exists', 'active'],
    keyFind: 'id',
  })
  @Patch('recover/:id')
  @HttpCode(HttpStatus.OK)
  async recoverUser(@Param(UserValidatePipe) param: BaseIdDTO) {
    const result = await this.userService.recover({
      filter: [
        {
          field: 'id',
          operator: 'eq',
          value: param.id,
        },
      ],
    });
    return result;
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.ADMIN)
  @ValidateBase<TValidateUser, User>({
    types: ['exists', 'active', 'deleted'],
    keyFind: 'id',
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Param(UserValidatePipe) param: BaseIdDTO,
    @Body() dto: UpdateUserDTO,
  ) {
    const result = await this.userService.updateOne(
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
    return result;
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.ADMIN)
  @ValidateBase<TValidateUser, User>({
    types: ['exists'],
    keyFind: 'id',
  })
  @Delete('hard/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async hardDeleteOne(@Param(UserValidatePipe) param: BaseIdDTO) {
    const result = await this.userService.hardDelete({
      filter: [
        {
          field: 'id',
          operator: 'eq',
          value: param.id,
        },
      ],
    });
    return result;
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.ADMIN)
  @ValidateBase<TValidateUser, User>({
    types: ['exists'],
    keyFind: 'id',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async softDelete(@Param(UserValidatePipe) param: BaseIdDTO) {
    const result = await this.userService.softDelete({
      filter: [
        {
          field: 'id',
          operator: 'eq',
          value: param.id,
        },
      ],
    });
    return result;
  }
}
