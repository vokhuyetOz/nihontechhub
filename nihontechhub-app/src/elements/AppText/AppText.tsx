import React from 'react';

import { Text, TextProps } from 'react-native';

import { useAppTheme } from '@utils/modules';
import { useAppSize } from '@utils/modules/Size/useAppSize';
import { ComonStyle } from '@utils/resource';

export function AppText(props: TextProps) {
  const { children, style, onPress } = props;
  const { Sizes } = useAppSize();
  const { Colors } = useAppTheme();

  return (
    <Text
      {...props}
      style={[
        ComonStyle.small,
        {
          color: Colors.app.Text_Primary,
          fontFamily: 'Merriweather',
        },
        style,
      ]}
      onPress={onPress}
    >
      {children}
    </Text>
  );
}
