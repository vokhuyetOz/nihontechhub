import { ResetPasswordService } from './../reset-password/reset-password.service';
import { AccessRole } from '@common/decorators/role.decorator';
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
import { CurrentAuthor, Public } from 'src/common/decorators';
import { BaseUpdatePasswordDTO } from 'src/common/dto';
import { EAuthorRole } from 'src/common/enums';
import { DateHelper, SwaggerHelper } from 'src/common/helper';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller({
  version: '1',
  path: 'user',
})
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly resetPasswordService: ResetPasswordService,
  ) {
    // generate Swagger get many query params
    SwaggerHelper.BaseQueryParamsMetadata(User, this.getMe);
  }

  @Public()
  @ApiBearerAuth()
  @Get('test')
  @HttpCode(HttpStatus.OK)
  async test() {
    return this.resetPasswordService.getMany({
      filter: [
        {
          field: 'user',
          operator: 'eq',
          value: '0196ae8c-78b8-70a4-a703-b1aeff561efb',
        },
      ],
    });
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.USER)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getMe(
    @ParsedRequest() req: TCustomCrudRequest<User>,
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
  @AccessRole(EAuthorRole.USER)
  @Patch('password')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @CurrentAuthor() user: User,
    @Body() body: BaseUpdatePasswordDTO,
  ) {
    const result = await this.service.selfUpdatePassword(user, body);
    return result;
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.USER)
  @Patch('me')
  @HttpCode(HttpStatus.OK)
  async updateMe(
    @CurrentAuthor('id') id: string,
    @Body() dto: Partial<UpdateUserDTO>,
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
  @AccessRole(EAuthorRole.USER)
  @Patch('deactivate')
  @HttpCode(HttpStatus.OK)
  async deactivateAccount(@CurrentAuthor('id') id: string) {
    const result = await this.service.deactivate({
      filter: [{ field: 'id', operator: 'eq', value: id }],
    });

    return result;
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.USER)
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
