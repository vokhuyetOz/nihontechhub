/**
 * config information of App
 */

import { Platform } from 'react-native';

const host = {
  api: 'https://api.nihontechhub.com/api',
  // api: 'http://192.168.10.80:1001/api',
  // api: 'http://localhost:4890/api',
  search: 'https://typesense.nihontechhub.com/search',
}; //dev

// const host = {
//   api: 'https://api.app.com',
// }; //pro

//dev
// const appKeys = {
//   codePush: Platform.select({
//     ios: 'key',
//     android: 'ads',
//   }),
//   otherKey: 'demo',
//   googleSigninClientId:
//     '',
// };
// pro
const appKeys = {
  codePush: Platform.select({
    ios: '2d06ab74-bd37-11f0-b801-0242ac180005',
    android: '3568e778-bd37-11f0-b801-0242ac180005',
    default: '2d06ab74-bd37-11f0-b801-0242ac180005',
  }),
  googleSigninClientId: '',
};

//dev
const deeplinkPrefixes = ['nihontechhub://'];

export const language = 'ja';

const termsOfService = '';
export { appKeys, deeplinkPrefixes, host, termsOfService };
