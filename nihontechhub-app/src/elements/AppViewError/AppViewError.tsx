import React from 'react';

import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { AppIcon } from '@elements/AppIcon';
import { AppText } from '@elements/AppText';
import { useAppSize, useAppTheme } from '@utils/modules';

import { AppTouchable } from '../AppTouchable';

type TAppViewError = Readonly<{
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}>;

export function AppViewError({
  onPress,
  style,
  title,
  titleStyle,
}: TAppViewError) {
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();
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
        name={'cloud-refresh-variant-outline'}
        size={Sizes.wpx(100)}
        color={Colors.app.Text_Secondary}
      />
      <AppText
        style={[
          {
            fontSize: Sizes.normal,
            paddingHorizontal: Sizes.padding.default,
            color: Colors.app.Functional_Error,
          },
          titleStyle,
        ]}
      >
        {title}
      </AppText>
    </AppTouchable>
  );
}
