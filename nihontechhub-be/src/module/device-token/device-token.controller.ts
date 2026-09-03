import { SwaggerHelper } from '@common/helper';
import { TCustomCrudRequest } from '@common/types';
import { ParsedRequest } from '@dataui/crud';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CurrentAuthor, Public } from 'src/common/decorators';
import { CreateDeviceTokenDTO } from '../device-token/dto';
import { DeviceTokenService } from './device-token.service';
import { DeviceToken } from './entities/device-token.entity';

export class TestDTO {
  @ApiProperty()
  @IsString()
  id: string;
}

@ApiBearerAuth()
@ApiTags('Device-token')
@Controller({
  version: '1',
  path: 'device-token',
})
export class DeviceTokenController {
  constructor(private readonly service: DeviceTokenService) {
    SwaggerHelper.BaseQueryParamsMetadata(
      DeviceToken,
      this.disableNotification,
    );

    SwaggerHelper.BaseQueryParamsMetadata(DeviceToken, this.activeNotification);

    SwaggerHelper.BaseQueryParamsMetadata(DeviceToken, this.getMany);
  }

  @Public()
  @Post()
  // @UseGuards(PoliciesGuard)
  @ApiOperation({
    summary: 'Create or update device token of user id',
  })
  async createDevice(
    @CurrentAuthor('id') id: string | undefined,
    @Body() body: CreateDeviceTokenDTO,
  ) {
    body.authorId = id;
    const result = await this.service.createOrUpdateDeviceTokens(body);

    return result;
  }

  @Public()
  @ApiBearerAuth()
  @Get('bulk')
  @HttpCode(HttpStatus.OK)
  async getMany(@ParsedRequest() req: TCustomCrudRequest<DeviceToken>) {
    const { parsed } = req;
    return this.service.getMany(parsed);
  }

  @Patch('disable')
  // @UseGuards(PoliciesGuard)
  @ApiOperation({
    summary: 'disable notification',
  })
  async disableNotification(
    @CurrentAuthor('id') id: string,
    @ParsedRequest() req: TCustomCrudRequest<DeviceToken>,
  ) {
    const { parsed } = req;
    parsed.filter = [
      ...parsed.filter,
      { field: 'userId', operator: '$eq', value: id },
    ];
    const result = await this.service.softDelete(parsed);

    return result;
  }

  @Patch('active')
  // @UseGuards(PoliciesGuard)
  @ApiOperation({
    summary: 'active notification',
  })
  async activeNotification(
    @CurrentAuthor('id') id: string,
    @ParsedRequest() req: TCustomCrudRequest<DeviceToken>,
  ) {
    const { parsed } = req;
    parsed.filter = [
      ...parsed.filter,
      { field: 'userId', operator: '$eq', value: id },
    ];
    const result = await this.service.recover(parsed);

    return result;
  }
}
