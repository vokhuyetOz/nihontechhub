import { CurrentAuthor } from '@common/decorators';
import { AccessRole } from '@common/decorators/role.decorator';
import { EAuthorRole } from '@common/enums';
import { AuthorHelper } from '@common/helper';
import { TAuthor } from '@common/types';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePushNotificationDTO } from './dto/create-notification-read-status.dto';
import { NotificationReadStatus } from './entities/notification-read-status.entity';
import { NotificationReadStatusService } from './notification-read-status.service';

@ApiBearerAuth()
@ApiTags('Notification read status')
@Controller({
  version: '1',
  path: 'notification-read-status',
})
export class NotificationReadStatusController {
  constructor(private readonly service: NotificationReadStatusService) {}

  @ApiProperty()
  @AccessRole(EAuthorRole.ADMIN, EAuthorRole.USER)
  @Post()
  @ApiOperation({
    summary: 'Save notification author already look details',
  })
  async getMany(
    @CurrentAuthor() author: TAuthor,
    @Body() body: CreatePushNotificationDTO,
  ) {
    const dto: Partial<NotificationReadStatus> = {
      authorId: author.id,
      authorRole: AuthorHelper.getEAuthorRole(author),
      ...body,
    };
    return this.service.createOne(dto);
  }
}
