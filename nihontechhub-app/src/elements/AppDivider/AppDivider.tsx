import React from 'react';

import { type DimensionValue, View, ViewStyle } from 'react-native';

import { useAppTheme } from '@utils/modules';

type TAppDivider = Readonly<{
  width?: DimensionValue;
  offset?: number;
  style?: ViewStyle;
}>;
export function AppDivider({ width = '100%', offset = 0, style }: TAppDivider) {
  const { Colors } = useAppTheme();
  return (
    <View style={[{ marginHorizontal: offset }, style]}>
      <View
        style={{
          width,
          height: 1,
          backgroundColor: Colors.app.Shape_Divider,
        }}
      />
    </View>
  );
}
