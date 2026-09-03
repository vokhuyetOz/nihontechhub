import React from 'react';

import { ColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { useAppSize } from '@utils/modules';

import { AppTouchable, TAppTouchableProps } from '../AppTouchable';

import { Icon } from './Icon';

/*
 * @param {onlyIcon, hitSlop, onPressIn, onPress, disabled, touchStyle, type, name, color, size, style} props
 */

export type TypeIconName = string;

export type IconType = 'Fontisto' | 'Figma' | 'MaterialDesignIcons';

export interface IconProps {
  type?: IconType;
  name: TypeIconName;
  size?: number;
  color?: ColorValue;
  style?: StyleProp<TextStyle>; // vector-icons were built on top of text
}

export type AppIconProps = IconProps &
  Omit<TAppTouchableProps, 'style'> & {
    onlyIcon?: boolean;
    touchStyle?: StyleProp<ViewStyle>;
    hasHitSlop?: boolean;
  };

export function AppIcon({
  type = 'MaterialDesignIcons',
  name,
  color,
  size,
  style,
  hitSlop,
  onlyIcon,
  onPress,
  ...touchProps
}: AppIconProps) {
  const { Sizes } = useAppSize();
  //without onPress
  //type, icon, color, size,

  if (onlyIcon || !onPress) {
    return (
      <Icon type={type} name={name} color={color} size={size} style={style} />
    );
  }
  let hitSlopRendering;
  if (typeof hitSlop === 'number') {
    hitSlopRendering = {
      top: hitSlop,
      left: hitSlop,
      right: hitSlop,
      bottom: hitSlop,
    };
  } else if (hitSlop) {
    hitSlopRendering = {
      top: Sizes.padding.default,
      left: Sizes.padding.default,
      right: Sizes.padding.default,
      bottom: Sizes.padding.default,
      ...(hitSlop as object),
    };
  }

  return (
    <AppTouchable hitSlop={hitSlopRendering} onPress={onPress} {...touchProps}>
      <Icon type={type} name={name} color={color} size={size} style={style} />
    </AppTouchable>
  );
}
