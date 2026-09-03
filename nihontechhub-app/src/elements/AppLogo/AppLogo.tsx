import { useAppSize } from '@utils/modules';
import React from 'react';
import { Image, ImageStyle, ViewStyle } from 'react-native';

type TAppLogoProps = Readonly<{
  size?:
    | 'small'
    | 'small1x'
    | 'small2x'
    | 'medium'
    | 'medium1x'
    | 'medium2x'
    | 'big'
    | 'big1x'
    | 'big2x';

  style?: ImageStyle & ViewStyle;
}>;

const logoSizes = {
  small: 10,
  small1x: 20,
  small2x: 25,
  medium: 30,
  medium1x: 35,
  medium2x: 40,
  big: 60,
  big1x: 65,
  big2x: 70,
};

export function AppLogo({ style, size = 'medium' }: TAppLogoProps) {
  const { Sizes } = useAppSize();

  const sizeInt = logoSizes[size];
  const logoWidth = Sizes.wpx(sizeInt);
  return (
    <Image
      source={require('@utils/images/app_logo.png')}
      resizeMode={'contain'}
      style={[
        {
          width: logoWidth,
          height: logoWidth,
          borderRadius: Sizes.border_radius,
        },
        style,
      ]}
    />
  );
}
