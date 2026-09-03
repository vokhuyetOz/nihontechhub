import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { EAuthorRole, ELanguage } from '../../common/enums';
import { BaseMongoService } from '../../common/services/base-mongo.service';
import { NotificationReadStatus } from './entities/notification-read-status.entity';
import { BASE_READ_READ_NOTIFICATION_ERROR } from './error';

@Injectable()
export class NotificationReadStatusService extends BaseMongoService<NotificationReadStatus> {
  private readonly langs = Object.values(ELanguage);
  constructor(
    @InjectRepository(NotificationReadStatus, 'mikro_orm_2')
    private readonly repo: EntityRepository<NotificationReadStatus>,
  ) {
    super(repo, BASE_READ_READ_NOTIFICATION_ERROR);
  }

  async getMapListNotificationIdIsRead(
    authorId: string,
    authorRole: EAuthorRole,
  ): Promise<Map<string, string>> {
    const listNotificationIsRead = (await this.getMany({
      filter: [
        { field: 'authorId', operator: '$eq', value: authorId },
        { field: 'authorRole', operator: '$eq', value: authorRole },
      ],
    })) as NotificationReadStatus[];
    const mapNotificationId = new Map<string, string>();
    for (const i of listNotificationIsRead) {
      mapNotificationId.set(i.notificationId, i.notificationId);
    }
    return mapNotificationId;
  }
}
