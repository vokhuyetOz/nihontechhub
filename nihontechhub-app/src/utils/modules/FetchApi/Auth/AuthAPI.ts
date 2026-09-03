import { FcmNotificationStorage } from '@utils/modules/Notification/UserNotificationSettingService';
import { host } from '@utils/resource';

import { FetchGet, FetchPost } from '../FetchApi';
import { RequestQueryParams } from '../Request';
import { TAPIResponseFormat } from '../types';

import { TLoginWithApple, TLoginWithGoogle, TProfile } from './AuthType';

export class AuthAPI {
  static async loginWithGoogle(dto: TLoginWithGoogle): Promise<any> {
    const token = FcmNotificationStorage.get();
    if (token) {
      dto.token = token;
    }
    return FetchPost(`${host.api}/v1/register/google`, dto);
  }
  static async loginWithApple(dto: TLoginWithApple): Promise<any> {
    const token = FcmNotificationStorage.get();
    if (token) {
      dto.token = token;
    }
    return FetchPost(`${host.api}/v1/register/apple`, dto);
  }
  static async profile(): Promise<TAPIResponseFormat<TProfile>> {
    const q = RequestQueryParams.select([
      'email',
      'provider',
      'profile',
      'profile.name',
      'profile.avatar',
    ]).query();
    return FetchGet(`${host.api}/v1/user/me?${q}`) as any;
  }
}
