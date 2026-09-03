/* eslint-disable no-undef */

import { setImmediate } from 'timers';
global.setImmediate = setImmediate;
// require('react-native-reanimated/lib/module/reanimated2/jestUtils').setUpTests();
// jest.useFakeTimers();

jest.mock('react-native-device-info', () =>
  require('react-native-device-info/jest/react-native-device-info-mock'),
);

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

jest.mock('@gorhom/bottom-sheet', () =>
  require('react-native-reanimated/mock'),
);
jest.mock('react-native-mmkv-storage', () => {
  const initialize = jest.fn(() => ({
    getString: jest.fn(),
  }));
  const asMock = {
    __INTERNAL_MOCK_STORAGE__: {},
    MMKVLoader: jest.fn(() => ({
      withInstanceID: jest.fn(() => ({
        initialize,
        withEncryption: jest.fn(() => ({ initialize })),
      })),
    })),
    useMMKVStorage: jest.fn(() => ['light']),
  };
  return asMock;
});

jest.mock('@react-native-firebase/messaging', () => {
  return {
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('myMockToken')),
  };
});
