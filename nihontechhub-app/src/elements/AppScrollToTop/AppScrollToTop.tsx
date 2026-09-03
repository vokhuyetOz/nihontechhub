import React from 'react';

import { StyleProp, ViewStyle } from 'react-native';
import { isTablet } from 'react-native-device-info';

import { SPAppScrollToTop } from './AppScrollToTop.sp';
import { TBAppScrollToTop } from './AppScrollToTop.tb';

type TAppScrollToTop = {
  style?: StyleProp<ViewStyle>;
  y?: number;
  scrollKey: string;
  hideIn: Array<'top' | 'center' | 'bottom'>;
};

export function AppScrollToTop(props: TAppScrollToTop) {
  const tablet = isTablet();

  if (tablet) {
    return <TBAppScrollToTop {...props} />;
  }
  return <SPAppScrollToTop {...props} />;
}
