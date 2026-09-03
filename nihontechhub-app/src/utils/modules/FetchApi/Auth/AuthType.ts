import { EAppLanguage, EAppOS } from '@utils/resource';

export enum EGoogleLoginFlowType {
  AUTH_CODE = 'auth-code',
  ONE_TAP = 'one_tap',
}

export type TLoginWithGoogle = {
  token?: string; //deviceToken optional
  deviceId: string;
  os: EAppOS;
  active: boolean;
  authorId?: string;
  authorRole?: string;
  language: EAppLanguage;
  access_token: string;
  flow_type?: EGoogleLoginFlowType;
};
export type TLoginWithApple = {
  token?: string; //deviceToken optional
  deviceId: string;
  os: EAppOS;
  active: boolean;
  authorId?: string;
  authorRole?: string;
  language: EAppLanguage;
  id_token: string;
  name?: string;
};
export type TProfileInformation = {
  id: string;
  version: number;
  active: any;
  deletedAt: any;
  createdAt: string;
  updatedAt: string;
  name: string;
  avatar: string;
  description: any;
  user: string;
};

export type TProfile = {
  id: string;
  version: number;
  active: boolean;
  deletedAt: any;
  createdAt: string;
  updatedAt: string;
  email: string;
  role: string;
  idSocialNetwork: string;
  provider: 'google' | 'apple';
  lastReadNotificationAt: any;
  profile: TProfileInformation;
};
