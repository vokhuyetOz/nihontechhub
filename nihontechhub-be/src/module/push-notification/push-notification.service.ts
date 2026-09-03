import { SCondition } from '@dataui/crud-request';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as admin from 'firebase-admin';
import { EAudienceType, ELanguage } from 'src/common/enums';
import { AuthorHelper, DateHelper } from 'src/common/helper';
import {
  Message,
  MulticastMessage,
  Notification,
  TAuthor,
  TCustomParsedRequestParams,
  TNotificationPayloadFirebaseData,
  TResponseGetManyWithCursor,
  TResponseGetManyWithPaging,
} from 'src/common/types';
import * as serviceAccount from '../../common/config/configService.json';
import { BaseMongoService } from '../../common/services/base-mongo.service';
import { AgendaService } from '../agenda/agenda.service';
import { DeviceTokenService } from '../device-token/device-token.service';
import { I18n } from '../i18n';
import { NotificationReadStatusService } from '../notification-read-status/notification-read-status.service';
import { CreatePushNotificationDTO } from './dto/create-push-notification.dto';
import { PushNotification } from './entities/push-notification.entity';
import { BASE_NOTIFICATION_ERROR } from './error';
@Injectable()
export class PushNotificationService extends BaseMongoService<PushNotification> {
  constructor(
    @InjectRepository(PushNotification, 'mikro_orm_2')
    private readonly repo: EntityRepository<PushNotification>,
    private readonly deviceTokenService: DeviceTokenService,
    private readonly agendaService: AgendaService,
    private readonly notificationReadStatusService: NotificationReadStatusService,
  ) {
    super(repo, BASE_NOTIFICATION_ERROR);

    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(JSON.stringify(serviceAccount)),
      ),
    });
  }

  /**
   * example using push notification for user
   * @param {
   *  audienceType: notification send for author type,
      recipientRole: Role recipient,
      authorType: author notification,
      title: notification title,
      content: notification content,
      sendAt: time to send notification,
   * }
    * <---for send all user and notification from system--->
    * @body {
          audienceType: EAudienceType.ALL,
          recipientRole: EAuthorRole.USER,
          authorType: EAuthorType.SYSTEM,
          title: 'test',
          content: { type: 'user', sendType: 'notice' },
          sendAt: DateHelper.currentDate(),
        }
    * <---for send list user and notification from system--->
    * @body {
          audienceType: EAudienceType.GROUP,
          recipientRole: EAuthorRole.USER,
          recipientIds: ['2cd757d1-65d4-4da0-b5a7-0c4a24fc52e9'],
          authorType: EAuthorType.SYSTEM,
          title: 'test',
          content: { type: 'user', sendType: 'notice' },
          sendAt: DateHelper.currentDate(),
        }
    * <---Send it all and exclude some users--->
    * @body {
         audienceType: EAudienceType.EXCLUDE,
        recipientRole: EAuthorRole.USER,
        recipientIds: [
          'e8f05ca9-8b50-429d-bb9d-c1468fec7d8b',
          'c5d3fe07-cb24-4d43-9322-1acc344a6941',
        ],
        authorType: EAuthorType.SYSTEM,
        title: 'test',
        content: { type: 'user', sendType: 'notice' },
        sendAt: DateHelper.currentDate(),
        }
   */

  //send 1 notification
  @OnEvent('notification.send')
  send(message: Message) {
    return admin.messaging().send(message);
  }

  //send many notification
  @OnEvent('notification.sendBulk')
  sendBulk(message: MulticastMessage) {
    return admin.messaging().sendEachForMulticast(message);
  }

  protected searchParamDefaultFindNotification(author: TAuthor): SCondition {
    const authorRole = AuthorHelper.getEAuthorRole(author);
    return {
      recipientRole: authorRole,
      $or: [
        {
          audienceType: EAudienceType.ALL,
        },
        {
          audienceType: EAudienceType.GROUP,
          recipientIds: author.id,
        },
        {
          audienceType: EAudienceType.EXCLUDE,
          recipientIds: { $ne: author.id },
        },
      ],
    };
  }

  //Create arr payload for push notification
  protected createPayloadsNotificationFirebase(
    batchedTokensByLanguage: Map<ELanguage, string[][]>,
    notification: (language: ELanguage) => Notification,
    data: TNotificationPayloadFirebaseData,
  ): MulticastMessage[] {
    const payloads: MulticastMessage[] = [];

    // Process each supported language
    batchedTokensByLanguage.forEach((tokenBatches, language) => {
      tokenBatches.forEach((tokenBatch) => {
        if (tokenBatch.length > 0) {
          const multicastMessage: MulticastMessage = {
            tokens: tokenBatch,
            notification: notification(language),
            data,
          };
          payloads.push(multicastMessage);
        }
      });
    });
    return payloads;
  }

  async getPayloadForFirebase(
    body: CreatePushNotificationDTO,
    notification: (language: ELanguage) => Notification,
    data: TNotificationPayloadFirebaseData,
  ): Promise<MulticastMessage[]> {
    const devices =
      await this.deviceTokenService.getDevicesFirebaseForPushNotification({
        audienceType: body.audienceType,
        recipientRole: body.recipientRole,
        recipientIds: body?.recipientIds,
      });

    const batchedTokensByLanguage =
      this.deviceTokenService.mapTokensByLanguage(devices);

    const payloads: MulticastMessage[] =
      this.createPayloadsNotificationFirebase(
        batchedTokensByLanguage,
        notification,
        data,
      );

    return payloads;
  }

  async pushNotificationForUser(body: CreatePushNotificationDTO) {
    const notification: PushNotification = await super.createOne(body);

    const payloads = await this.getPayloadForFirebase(
      body,
      (language: ELanguage) => {
        return {
          title: I18n[language].notificationTitle,
          body: I18n[language].notificationTitle,
        };
      },
      {
        notificationId: notification.id,
      },
    );
    for (const payload of payloads) {
      await this.agendaService.createJob({
        payload,
        name: notification.id.toString(),
        scheduleTime: body.sendAt,
        emitName: 'notification.sendBulk',
      });
    }
  }

  async getListNotification(
    author: TAuthor,
    parsed: Partial<TCustomParsedRequestParams<PushNotification>>,
  ) {
    parsed.page = parsed?.page ?? 1;
    parsed.limit = parsed?.limit ?? 10;

    const defaultSearch = this.searchParamDefaultFindNotification(author);
    const authorRole = AuthorHelper.getEAuthorRole(author);

    parsed.search = {
      ...defaultSearch,
      sendAt: { $lte: DateHelper.currentDate() as unknown as string },
    };

    const mapNotificationIdIsRead =
      await this.notificationReadStatusService.getMapListNotificationIdIsRead(
        author.id,
        authorRole,
      );

    const records = (await super.getMany(parsed)) as
      | TResponseGetManyWithPaging<PushNotification>
      | TResponseGetManyWithCursor<PushNotification>;

    const data = records?.data.reduce((pre, curr) => {
      const obj = {
        ...curr,
        id: curr._id,
        isRead: mapNotificationIdIsRead.has(curr.id),
      };
      delete obj?._id;
      return [...pre, obj];
    }, []);

    return { ...records, data };
  }

  // count all new notification
  async countNewNotification(
    author: TAuthor,
  ): Promise<{ new_notifications: number }> {
    const defaultSearch = this.searchParamDefaultFindNotification(author);

    const new_notifications = await this.count({
      search: {
        ...defaultSearch,
        sendAt: {
          $gt:
            (author.lastReadNotificationAt as unknown as string) ??
            (new Date(0) as unknown as string),
          $lte: DateHelper.currentDate() as unknown as string,
        },
      },
    });

    return { new_notifications };
  }
}
