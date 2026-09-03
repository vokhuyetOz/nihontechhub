// import {Platform, Alert} from 'react-native';
// import {isLocationEnabled} from 'react-native-device-info';
import { Alert, Platform } from 'react-native';
import {
  check,
  checkNotifications,
  openSettings,
  PERMISSIONS,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';
import { LanguageService } from './Language';

// import { LanguageService } from './Language';
// const locationStep1 = async () => {
//   try {
//     const permission = Platform.select({
//       android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//       ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
//     }) as Permission;
//     let checkPermision = await check(permission);
//     if (checkPermision === RESULTS.GRANTED) {
//       return true;
//     }

//     if (isIOS && checkPermision === RESULTS.BLOCKED) {
//       checkPermision = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
//       if (checkPermision === RESULTS.GRANTED) {
//         return true;
//       }
//     }
//     if (checkPermision === RESULTS.DENIED) {
//       const requestPermission = await request(permission);
//       if (requestPermission === RESULTS.GRANTED) {
//         return true;
//       }
//       if (isIOS && requestPermission === RESULTS.BLOCKED) {
//         checkPermision = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
//         if (checkPermision === RESULTS.GRANTED) {
//           return true;
//         }
//         return false;
//       }
//     }
//     return false;
//   } catch (error) {
//     return false;
//   }
// };
export const AppPermission = {
  file: async (): Promise<boolean> => {
    const Strings = LanguageService.get();
    try {
      if (Platform.OS === 'ios') {
        return true;
      }
      const permission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
      const resultCheck = await check(permission);
      if (resultCheck === RESULTS.GRANTED) {
        return true;
      }
      if (resultCheck === RESULTS.UNAVAILABLE) {
        return false;
      }
      if (resultCheck === RESULTS.BLOCKED) {
        Alert.alert(Strings.Permission, Strings.File_permission_denied, [
          {
            text: Strings.Setting,
            onPress: async () => {
              try {
                await openSettings();
              } catch {}
            },
          },
          {
            text: Strings.Cancel,
            style: 'cancel',
          },
        ]);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  },
  checkNotification: async () => {
    const checkNoti = await checkNotifications();
    return checkNoti.status === RESULTS.GRANTED;
  },
  notification: async () => {
    try {
      const checkNoti = await checkNotifications();
      if (checkNoti.status === RESULTS.GRANTED) {
        return true;
      }
      const requestPermission = await requestNotifications();
      if (requestPermission.status === RESULTS.GRANTED) {
        return true;
      }
    } catch {}
    return false;
  },
  // location: async () => {
  //   const Strings = LanguageService.get();
  //   const permission = await locationStep1();
  //   if (!permission) {
  //     Alert.alert(
  //       Strings.Permission_denided,
  //       Strings.Permission_denided_description,
  //       [
  //         {
  //           text: Strings.Ok,
  //           onPress: async () => {
  //             try {
  //               await openSettings();
  //             } catch (error) {}
  //           },
  //         },
  //         {
  //           text: Strings.Cancel,
  //           style: 'cancel',
  //         },
  //       ],
  //     );
  //     return false;
  //   }
  //   const gpsEnable = await isLocationEnabled();
  //   if (!gpsEnable) {
  //     Alert.alert(Strings.Gps, Strings.Gps_description);
  //     return false;
  //   }
  //   return true;
  // },
};
