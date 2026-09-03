import { MMKVLoader } from 'react-native-mmkv-storage';

const tag = 'user-notification-setting';

const mmkvId = `mmkv-${tag}`;
const mmkvKey = `key-${tag}`;

const MMKVwithID = new MMKVLoader().withInstanceID(mmkvId).initialize();

export const UserNotificationSettingService = {
  set: (status: boolean) => {
    MMKVwithID.setBool(mmkvKey, status);
  },
  get: () => MMKVwithID.getBool(mmkvKey),
};
