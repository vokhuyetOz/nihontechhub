import { Platform } from 'react-native';
import { getVersion } from 'react-native-device-info';

import { host } from '@utils/resource';

import { FetchPost } from '../FetchApi';

export class AppVersionAPI {
  static async checkAppVersion() {
    const data = {
      os: Platform.select({ ios: 'ios', android: 'android', default: 'ios' }),
      version: getVersion(),
    };
    const api = `${host.api}/v1/app-version/check`;
    const result = await FetchPost(api, data);
    return result;
  }
}
