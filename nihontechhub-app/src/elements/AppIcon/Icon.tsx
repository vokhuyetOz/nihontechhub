import React from 'react';

import { Fontisto } from '@react-native-vector-icons/fontisto';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useAppSize, useAppTheme } from '@utils/modules';

import { IconProps } from './AppIcon';
import { Figma } from './Figma';

type TIconProps = Readonly<IconProps>;

export function Icon({
  type = 'MaterialDesignIcons',
  name,
  color,
  size,
  style,
}: TIconProps) {
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();
  const config = {
    name,
    size: size ?? Sizes.heading1,
    color: color ?? Colors.app.Text_Primary,
    style,
  };

  const Component = {
    Fontisto,
    MaterialDesignIcons,
    Figma,
  }[type];

  return <Component {...config} />;
}
