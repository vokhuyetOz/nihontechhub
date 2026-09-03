import React, { ReactNode } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

type TAppTouchable = TAppTouchableProps & Omit<PressableProps, 'style'>;

export type TAppTouchableProps = Readonly<{
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number;
  children?: ReactNode;
  disabled?: boolean;
  hitSlop?:
    | number
    | { top: number; left: number; bottom: number; right: number };
  onPress?(): void;
}>;

export function AppTouchable({
  children,
  activeOpacity = 0.6,
  style,
  disabled,
  hitSlop,
  onPress,
  ...props
}: TAppTouchable) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={hitSlop}
      style={({ pressed }) => [
        style,
        {
          opacity: pressed ? activeOpacity : 1,
        },
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
}
