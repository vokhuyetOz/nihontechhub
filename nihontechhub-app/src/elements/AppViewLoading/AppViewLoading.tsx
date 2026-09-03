import React from 'react';
import {
  ColorValue,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Circle } from 'react-native-animated-spinkit';

import { useAppSize, useAppTheme } from '@utils/modules';
import { AppText } from '../AppText';

type TAppViewLoading = Readonly<{
  loadingText?: string;
  loadingTextStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  color?: ColorValue;
  sizeSpinner?: number;
}>;

export function AppViewLoading({
  style,
  color,
  sizeSpinner,
  loadingText,
  loadingTextStyle,
}: TAppViewLoading) {
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();

  return (
    <View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        },
        style,
      ]}
    >
      <Circle size={sizeSpinner ?? 24} color={color ?? Colors.app.Primary} />
      {!!loadingText && (
        <AppText
          style={[
            { color, paddingRight: Sizes.padding.default / 2 },
            loadingTextStyle,
          ]}
        >
          {loadingText}
        </AppText>
      )}
    </View>
  );
}
