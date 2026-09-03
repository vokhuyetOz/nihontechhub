import React from 'react';
import { Controller, UseControllerProps } from 'react-hook-form';
import { StyleProp, View, ViewStyle } from 'react-native';

import { AppIcon } from '@elements/AppIcon';
import { AppText } from '@elements/AppText';
import { AppTouchable } from '@elements/AppTouchable';
import { Sizes, useAppTheme } from '@utils/modules';

export type AppInputCheckboxProps = UseControllerProps & {
  defaultValue?: boolean;
  title?: string;
  style?: StyleProp<ViewStyle>;
};

export function AppInputCheckbox({
  control,
  title,
  style,
  name,
  defaultValue,
}: AppInputCheckboxProps) {
  const { Colors } = useAppTheme();

  const getColor = (value: boolean) => {
    if (!value) {
      return Colors.app.Background_Base;
    }
    return Colors.app.Primary;
  };

  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <AppTouchable
            style={[{ flexDirection: 'row', alignItems: 'flex-end' }, style]}
            onPress={() => {
              onChange(!value);
            }}
          >
            <View
              style={{
                padding: Sizes.padding.tiny,
                borderRadius: Sizes.border_radius / 2,
                borderWidth: Sizes.border,
                borderColor: Colors.input.border,
              }}
            >
              <AppIcon
                name="done"
                type="MaterialIcons"
                color={getColor(value)}
              />
            </View>
            {title && (
              <AppText
                style={{
                  fontSize: Sizes.small,
                  marginLeft: Sizes.padding.default,
                  fontWeight: '400',
                  bottom: Sizes.padding.tiny,
                  lineHeight: Sizes.normal,
                }}
              >
                {title}
              </AppText>
            )}
          </AppTouchable>
        );
      }}
    />
  );
}
