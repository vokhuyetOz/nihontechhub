import { PickType } from '@nestjs/swagger';
import { NotificationReadStatus } from '../entities/notification-read-status.entity';

export class CreatePushNotificationDTO extends PickType(
  NotificationReadStatus,
  ['notificationId'],
) {}
