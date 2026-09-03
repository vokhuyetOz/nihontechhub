import React from 'react';
import { ImageStyle, StyleProp, View } from 'react-native';

import { AppText } from '@elements/AppText';
import { ComonStyle, Sizes, useAppLanguage, useAppTheme } from '@utils/modules';

const primaryTextSizes = {
  medium: Sizes.wpx(48),
  large: Sizes.wpx(68),
};
const secondTextSizes = {
  medium: Sizes.wpx(16),
  large: Sizes.wpx(22),
};

export type AppLogoTextProps = Readonly<{
  size?: keyof typeof primaryTextSizes;
  style?: StyleProp<ImageStyle>;
}>;
export function AppLogoText({
  style,
  size = 'medium',
}: AppLogoTextProps): JSX.Element {
  const { Strings } = useAppLanguage();
  const { Colors } = useAppTheme();

  return (
    <View
      style={[
        {
          alignSelf: 'center',
          alignItems: 'center',
        },
        style,
      ]}
    >
      <AppText
        style={[
          ComonStyle.bold,
          {
            fontSize: primaryTextSizes[size],
            color: Colors.app.Primary,
            paddingTop: Sizes.padding.default,
          },
        ]}
      >
        {Strings.App_name}
      </AppText>
      <AppText
        style={[
          ComonStyle.bold,
          {
            fontSize: secondTextSizes[size],
            color: Colors.app.Primary,
            paddingTop: Sizes.padding.default,
          },
        ]}
      >
        {Strings.Intro_description}
      </AppText>
    </View>
  );
}
