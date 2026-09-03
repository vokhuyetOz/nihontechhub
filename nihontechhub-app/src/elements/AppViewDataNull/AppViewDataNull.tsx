import React from 'react';

import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { useAppLanguage, useAppSize, useAppTheme } from '@utils/modules';

import { AppIcon } from '../AppIcon';
import { AppText } from '../AppText';
import { AppTouchable } from '../AppTouchable';

type TAppViewDataNull = Readonly<{
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}>;

export function AppViewDataNull({
  onPress,
  style,
  title,
  titleStyle,
}: TAppViewDataNull) {
  const { Strings } = useAppLanguage();
  const { Sizes } = useAppSize();
  const { Colors } = useAppTheme();
  return (
    <AppTouchable
      onPress={onPress}
      style={[
        {
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: Sizes.padding.default,
        },
        style,
      ]}
    >
      <AppIcon
        name={'weather-snowy-rainy'}
        size={Sizes.heading2 * 3}
        color={Colors.app.Text_Secondary}
      />
      <AppText
        style={[
          {
            fontSize: Sizes.large,
            marginTop: Sizes.padding.default,
          },
          titleStyle,
        ]}
      >
        {title ?? Strings.Empty_data}
      </AppText>
    </AppTouchable>
  );
}
