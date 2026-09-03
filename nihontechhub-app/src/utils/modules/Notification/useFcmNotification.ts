import { useEffect } from 'react';

import { Platform } from 'react-native';

import { getCrashlytics } from '@react-native-firebase/crashlytics';
import {
  FirebaseMessagingTypes,
  AuthorizationStatus,
  getMessaging,
} from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { MainTabScreenProps } from '@utils/navigation/types';
import { ENotificationType } from '@utils/resource';

import { NotificationAPI } from '../FetchApi/Notification/NotificationAPI';

import { FcmNotificationStorage } from './UserNotificationSettingService';

async function saveTokenToDatabase(fcmToken?: string) {
  if (!fcmToken) {
    return;
  }
  const currentToken = FcmNotificationStorage.get();
  if (currentToken === fcmToken) {
    return;
  }
  const data = await NotificationAPI.deviceToken(fcmToken);
  if (data?.id) {
    //save to local after call api success
    FcmNotificationStorage.set(fcmToken);
  }
}
async function requestUserPermission(): Promise<boolean> {
  const authStatus = await getMessaging().requestPermission();

  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED ||
    authStatus === AuthorizationStatus.PROVISIONAL;
  return enabled;
}
/**
 * ask for permission
 * save token to local storage
 * update token to server
 * @returns
 */
export async function requestFcmToken() {
  try {
    const permissonEnable = await requestUserPermission();
    if (!permissonEnable) {
      return;
    }
    if (Platform.OS === 'ios') {
      await getMessaging().registerDeviceForRemoteMessages?.();
    }
    const fcmToken = await getMessaging().getToken();

    saveTokenToDatabase(fcmToken);
  } catch (error) {
    getCrashlytics().recordError(error as Error);
  }
}

export const useFcmNotification = () => {
  const navigation =
    useNavigation<MainTabScreenProps<'TabOneNavigator'>['navigation']>();

  useEffect(() => {
    // Listen to whether the token changes
    return getMessaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
  }, []);

  // Handling foreground message notifications
  useEffect(() => {
    const handleNotification = (
      remoteMessage: FirebaseMessagingTypes.RemoteMessage | null,
    ) => {
      console.log('handleNotification', remoteMessage);
      if (!remoteMessage) {
        return;
      }
      if (!remoteMessage.notification) {
        //TODO: silient push notification
        return;
      }

      // title: remoteMessage.notification?.title,
      //   body: remoteMessage.notification?.body,

      const type = remoteMessage.data?.type as ENotificationType;
      if (!type) {
        return;
      }
      if (!Object.values(ENotificationType).includes(type)) {
        console.warn('Unverified type', type);
        return;
      }
      const newsId = remoteMessage.data?.newsId as string;
      if (newsId) {
        if (type === ENotificationType.NEWS) {
          navigation.push('NewsDetail', {
            data: {
              id: newsId,
              title: remoteMessage.notification?.title ?? '',
              summary: remoteMessage.notification?.body ?? '',
            },
          });
        }
        return;
      }
      //TODO: handle other cases
    };

    const unsubscribe = getMessaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('onMessage', remoteMessage);
        if (!remoteMessage.notification) {
          //TODO: silient push notification
          return;
        }
        // const onPress = () => {
        //   //TODO: based on app action
        // };
        // title: remoteMessage.notification?.title,
        //   body: remoteMessage.notification?.body,
        // Get the message body
      },
    );

    getMessaging().getInitialNotification().then(handleNotification);
    getMessaging().onNotificationOpenedApp(handleNotification);
    return unsubscribe;
  }, []);
};
getMessaging().setBackgroundMessageHandler(
  async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    console.log('backgroundMessage', remoteMessage);
    //TODO: background push notification
  },
);
