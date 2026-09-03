import { deeplinkPrefixes } from '@utils/resource';

//TODO: use Linking to build deep link for push notification and url to open app later
//current screen will be open by handle in useFcmNotification
// function buildDeepLinkFromNotificationData(data?: {
//   type?: ENotificationType;
//   newsId?: string;
//   [key: string]: any;
// }): string | null {
//   if (!data || !data?.type) {
//     return null;
//   }
//   const type = data?.type;
//   if (!Object.values(ENotificationType).includes(type)) {
//     console.warn('Unverified type', type);
//     return null;
//   }
//   const newsId = data?.newsId;
//   if (newsId) {
//     if (type === ENotificationType.NEWS) {
//       return `nihontechhub://news/${newsId}`;
//     }
//     if (type === ENotificationType.EVENT) {
//       return `nihontechhub://event/${newsId}`;
//     }
//     if (type === ENotificationType.HIGHLIGHT) {
//       return `nihontechhub://highlight/${newsId}`;
//     }
//   }

//   console.warn('Missing newsId');
//   return null;
// }

const linking = {
  prefixes: deeplinkPrefixes,
  config: {
    initialRouteName: 'MainNavigator',
    screens: {
      MainNavigator: 'home',
      NewsDetail: 'news/:id',
    },
  },
  // async getInitialURL() {
  //   const url = await Linking.getInitialURL();
  //   console.log('getInitialURL', url);
  //   if (typeof url === 'string') {
  //     return url;
  //   }
  //   //getInitialNotification: When the application is opened from a quit state.
  //   const message = await getMessaging().getInitialNotification();

  //   const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
  //   if (typeof deeplinkURL === 'string') {
  //     return deeplinkURL;
  //   }
  // },
  // subscribe(listener: (url: string) => void) {
  //   const onReceiveURL = ({ url }: { url: string }) => {
  //     console.log('onReceiveURL', url);
  //     return listener(url);
  //   };

  //   // Listen to incoming links from deep linking
  //   const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

  //   //onNotificationOpenedApp: When the application is running, but in the background.
  //   const unsubscribe = getMessaging().onNotificationOpenedApp(
  //     remoteMessage => {
  //       const url = buildDeepLinkFromNotificationData(remoteMessage.data);
  //       if (typeof url === 'string') {
  //         listener(url);
  //       }
  //     },
  //   );

  //   return () => {
  //     linkingSubscription.remove();
  //     unsubscribe();
  //   };
  // },
};

export default linking;
