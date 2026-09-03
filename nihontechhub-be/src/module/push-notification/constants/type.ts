import { GetManyDefaultResponse } from '@dataui/crud';
import * as admin from 'firebase-admin';
import { TokenMessage as FirebaseTokenMessage } from 'firebase-admin/lib/messaging';
import { PushNotification } from '../entities/push-notification.entity';
export type Message = admin.messaging.Message;
export type MulticastMessage = admin.messaging.MulticastMessage;
export type SendResponse = admin.messaging.SendResponse;
export type Notification = admin.messaging.Notification;
export type TokenMessage = FirebaseTokenMessage;

export type TResponseListNotification = GetManyDefaultResponse<
  PushNotification & { isRead: boolean }
>;

export type TNotificationPayloadFirebaseData = {
  notificationId: string;
};

export const baseSendType = {
  NOTICE: 'notice',
} as const;

export const systemSendType = { ...baseSendType } as const;

export type TSystemNotificationContent = {
  type: 'system';
  sendType: (typeof systemSendType)[keyof typeof systemSendType];
};

export const adminSendType = { ...baseSendType } as const;

export type TAdminNotificationContent = {
  type: 'admin';
  sendType: (typeof adminSendType)[keyof typeof adminSendType];
};

export const userSendType = { ...baseSendType } as const;

export type TUserNotificationContent = {
  type: 'user';
  sendType: (typeof userSendType)[keyof typeof userSendType];
};

export type TNotificationContent =
  | TSystemNotificationContent
  | TAdminNotificationContent
  | TUserNotificationContent;
