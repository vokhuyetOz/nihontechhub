import React from 'react';

import { useWatch } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

import { useAppSize, useAppTheme, useScrollRef } from '@utils/modules';
import { ComonStyle } from '@utils/resource';

import { AppIcon } from '../AppIcon/AppIcon';

type TAppScrollToTop = {
  style?: StyleProp<ViewStyle>;
  y?: number;
  scrollKey: string;
  hideIn: Array<'top' | 'center' | 'bottom'>;
};

export function TBAppScrollToTop({
  scrollKey,
  y = 60,
  hideIn = ['top'],
}: TAppScrollToTop) {
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();

  const scrollPosition = useWatch({ name: 'scrollPosition', exact: true });
  const { scrollToTop } = useScrollRef(scrollKey);

  const onPress = () => {
    scrollToTop();
  };

  if (hideIn?.includes(scrollPosition)) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutUp}
      style={[
        ComonStyle.shadow(),
        {
          position: 'absolute',
          bottom: y,
          right: Sizes.padding.default,
          backgroundColor: 'rgba(255,255,255,0.4)',
          borderRadius: Sizes.oval_radius,
        },
      ]}
    >
      <AppIcon
        onPress={onPress}
        name="chevron-triple-up"
        size={Sizes.avatar}
        color={Colors.app.Primary}
        style={{ padding: Sizes.padding.default }}
      />
    </Animated.View>
  );
}
