import { MMKVLoader } from 'react-native-mmkv-storage';

const tag = 'notification-fcm';

const mmkvId = `mmkv-${tag}`;
const mmkvKey = `key-${tag}`;

const MMKVwithID = new MMKVLoader().withInstanceID(mmkvId).initialize();

export const FcmNotificationStorage = {
  set: (deviceToken: string) => {
    MMKVwithID.setString(mmkvKey, deviceToken);
  },
  remove: () => {
    MMKVwithID.setString(mmkvKey, '');
  },
  get: () => MMKVwithID.getString(mmkvKey),
};
