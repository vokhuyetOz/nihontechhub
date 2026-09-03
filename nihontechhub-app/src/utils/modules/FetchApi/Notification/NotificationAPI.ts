import { Platform } from 'react-native';
import { getUniqueIdSync } from 'react-native-device-info';

import { capitalizeFirstChar } from '@utils/modules/Convert';
import { host, language } from '@utils/resource';

import { FetchPost } from '../FetchApi';

export class NotificationAPI {
  static async deviceToken(fcmToken: string) {
    const { data } = await FetchPost(`${host.api}/v1/device-token`, {
      deviceId: getUniqueIdSync(),
      os: Platform.OS.toLowerCase(),
      language: capitalizeFirstChar(language),
      token: fcmToken,
    });
    return data;
  }
}
