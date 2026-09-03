import React, { Fragment, ReactNode } from 'react';

import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { useAppSize } from '@utils/modules';

import { AppIcon, IconProps } from '../AppIcon';
import { AppText } from '../AppText';
import { AppTouchable, TAppTouchableProps } from '../AppTouchable';
import { AppViewLoading } from '../AppViewLoading';

import { TButtonSize, TButtonVariant, useButtonStyle } from './useButtonStyle';
export type AppButtonNormalProps = TAppTouchableProps & {
  icon?: IconProps;
  title?: string;
  titleStyle?: TextStyle;
  style?: StyleProp<Omit<ViewStyle, 'opacity'>>;
  activeOpacity?: number;
  loading?: boolean;
  loadingText?: string;
  sizeSpinner?: number;
  buttonSize?: TButtonSize;
  buttonVariant?: TButtonVariant;
  customLoadingSpiner?: () => any;
  renderRight?: () => ReactNode;
  renderLeft?: () => ReactNode;
};

export function AppButtonNormal({
  icon,
  title,
  titleStyle,
  loading,
  style,
  disabled,
  hitSlop,
  loadingText,
  buttonSize = 'medium',
  buttonVariant = 'solid',
  sizeSpinner,
  customLoadingSpiner,
  renderRight,
  renderLeft,
  ...touchProps
}: AppButtonNormalProps) {
  const { Sizes } = useAppSize();
  const { sizeStyle, variantStyle } = useButtonStyle({
    elSize: buttonSize,
    elVariant: buttonVariant,
  });
  const { variantStyle: disabledStyle } = useButtonStyle({
    elVariant: 'disable',
  });

  const renderContent = () => {
    if (loading) {
      return (
        <Fragment>
          {customLoadingSpiner ? (
            customLoadingSpiner()
          ) : (
            <AppViewLoading
              loadingText={loadingText}
              color={variantStyle?.textColor}
              sizeSpinner={sizeSpinner ?? sizeStyle.fontSize}
              style={{ marginHorizontal: sizeStyle.paddingHorizontal }}
            />
          )}
        </Fragment>
      );
    }
    return (
      <Fragment>
        {renderRight?.()}
        {!!icon && (
          <AppIcon
            onlyIcon
            color={variantStyle.textColor}
            size={sizeStyle.fontSize}
            {...icon}
          />
        )}
        {!!title && (
          <AppText
            style={[
              {
                paddingLeft: icon ? sizeStyle.paddingHorizontal : undefined,
                fontSize: sizeStyle?.fontSize,
                color: variantStyle?.textColor,
              },
              titleStyle,
              disabled && {
                color: disabledStyle?.textColor,
              },
            ]}
          >
            {title}
          </AppText>
        )}
        {renderLeft?.()}
      </Fragment>
    );
  };

  let hitSlopRendering: any = {};
  if (hitSlop) {
    hitSlopRendering = {
      top: hitSlop ?? Sizes.padding.default,
      left: hitSlop ?? Sizes.padding.default,
      right: hitSlop ?? Sizes.padding.default,
      bottom: hitSlop ?? Sizes.padding.default,
    };
  }

  return (
    <AppTouchable
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          minWidth: Sizes.wpx(20),
          paddingHorizontal: sizeStyle?.paddingHorizontal,
          paddingVertical: sizeStyle?.paddingVertical,
          borderWidth: variantStyle?.borderWidth,
          borderColor: variantStyle?.borderColor,
          backgroundColor: variantStyle?.backgroundColor,
          borderRadius: variantStyle.borderRadius,
        },
        style,
        disabled && {
          borderWidth: disabledStyle?.borderWidth,
          borderColor: disabledStyle?.borderColor,
          backgroundColor: disabledStyle?.backgroundColor,
        },
      ]}
      disabled={loading ?? disabled}
      hitSlop={hitSlopRendering}
      {...touchProps}
    >
      {renderContent()}
    </AppTouchable>
  );
}
