import { AccessRole } from '@common/decorators/role.decorator';
import { EAuthorRole } from '@common/enums';
import { SwaggerHelper } from '@common/helper';
import { ParsedRequest } from '@dataui/crud';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentAuthor } from 'src/common/decorators';
import { TAuthor, TCustomCrudRequest } from 'src/common/types';
import { PushNotification } from './entities/push-notification.entity';
import { PushNotificationService } from './push-notification.service';

@ApiBearerAuth()
@ApiTags('Push-notification')
@Controller({
  version: '1',
  path: 'push-notification',
})
export class PushNotificationController {
  constructor(
    private readonly pushNotificationService: PushNotificationService,
  ) {
    SwaggerHelper.BaseQueryParamsMetadata(PushNotification, this.getMany);
  }

  @Get('bulk')
  @AccessRole(EAuthorRole.ADMIN, EAuthorRole.USER)
  @ApiOperation({
    summary: 'Get notification for author',
  })
  async getMany(
    @CurrentAuthor() author: TAuthor,
    @ParsedRequest() req: TCustomCrudRequest<PushNotification>,
  ) {
    return this.pushNotificationService.getListNotification(author, req.parsed);
  }

  @Get('count-new-notification')
  @AccessRole(EAuthorRole.ADMIN, EAuthorRole.USER)
  @ApiOperation({
    summary: 'Count new notification',
  })
  async countNewNotification(@CurrentAuthor() author: TAuthor) {
    const result =
      await this.pushNotificationService.countNewNotification(author);
    return result;
  }
}
