import { useEffect, useState } from 'react';

import {
  Appearance,
  ColorSchemeName,
  NativeEventSubscription,
} from 'react-native';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

import { CheckLogic, Colors } from '../../resource';

const tag = 'theme';

const mmkvId = `mmkv-${tag}`;
const mmkvKey = `key-${tag}`; //Colors
const MMKVwithID = new MMKVLoader().withInstanceID(mmkvId).initialize();

const convertForBaseOnDevice = (
  currentCode: string,
  scheme?: ColorSchemeName,
) => {
  if (currentCode === CheckLogic.Theme.dark) {
    return Colors.dark;
  }
  if (currentCode === CheckLogic.Theme.light) {
    return Colors.light;
  }
  //base on device
  if (!scheme) {
    //init data
    scheme = Appearance.getColorScheme();
  }
  if (scheme === CheckLogic.Theme.dark) {
    return Colors.dark;
  }
  return Colors.light;
};
const ModeService = {
  setCode: (code: string) => {
    MMKVwithID.setString(`${mmkvKey}`, code);
  },
  getCode: () =>
    MMKVwithID.getString(`${mmkvKey}`) || CheckLogic.Theme.base_device,

  getColors: () => {
    const code = ModeService.getCode();
    return convertForBaseOnDevice(code);
  },
};

function useAppTheme() {
  const [code] = useMMKVStorage(mmkvKey, MMKVwithID);

  const [colors, setColors] = useState(convertForBaseOnDevice('light'));

  useEffect(() => {
    if (code) {
      const colorConvert = convertForBaseOnDevice(code);
      if (colorConvert.app !== colors.app) {
        setColors(colorConvert);
      }
    }
  }, [code]);

  useEffect(() => {
    let removeListener: NativeEventSubscription = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      remove: () => {},
    };
    let firstTime = true;
    if (ModeService.getCode() === CheckLogic.Theme.base_device) {
      const listener = (preferences: Appearance.AppearancePreferences) => {
        if (firstTime) {
          firstTime = false;
          return;
        }
        const currentCode = ModeService.getCode();
        //check for base_device theme listener
        const color = convertForBaseOnDevice(
          currentCode,
          preferences.colorScheme,
        );
        if (color.app.Background_Base !== colors.app.Background_Base) {
          setColors(color);
        }
      };
      if (removeListener) {
        removeListener.remove();
      }
      removeListener = Appearance.addChangeListener(listener);
    }
    return () => {
      if (removeListener) {
        removeListener.remove();
      }
    };
  }, []);
  return { Colors: colors, code };
}

export { ModeService, useAppTheme };
