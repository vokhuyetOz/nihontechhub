import { PickType } from '@nestjs/swagger';
import { PushNotification } from '../entities/push-notification.entity';

export class CreatePushNotificationDTO extends PickType(PushNotification, [
  'audienceType',
  'recipientRole',
  'recipientIds',
  'authorType',
  'authorId',
  'title',
  'content',
  'sendAt',
]) {}
