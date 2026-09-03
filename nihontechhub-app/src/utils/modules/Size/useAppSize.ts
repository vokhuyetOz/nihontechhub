import { Sizes } from '@utils/resource';
import DeviceInfo from 'react-native-device-info';

export const useAppSize = () => {
  const isLandscape = DeviceInfo.isLandscapeSync();
  const isTablet = DeviceInfo.isTablet();

  let orientation: keyof typeof Sizes.mobile = 'portrait';
  if (isLandscape) {
    orientation = 'landscape';
  }
  if (isTablet) {
    return { Sizes: Sizes.tablet[orientation] };
  }
  return { Sizes: Sizes.mobile[orientation] };
};
