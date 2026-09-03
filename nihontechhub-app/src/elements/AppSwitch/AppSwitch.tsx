import { AppText } from '@elements/AppText';
import { useAppSize, useAppTheme } from '@utils/modules';
import React from 'react';
import { Controller, UseControllerProps } from 'react-hook-form';

import { ColorValue, StyleProp, Switch, View, ViewStyle } from 'react-native';

export type AppSwitchProps = UseControllerProps & {
  data?: {
    activeTrackColor?: ColorValue;
    inActiveTrackColor?: ColorValue;
    thumbColor?: ColorValue;
    lableColor?: ColorValue;
  };
  label?: string;
  styleSwitch?: StyleProp<ViewStyle>;
  styleLable?: StyleProp<ViewStyle>;
  onChangeValue?: (value: boolean) => void;
};
export function AppSwitch({
  control,
  name,
  data = {},
  styleSwitch,
  styleLable,
  defaultValue,
  label,
  disabled,
  onChangeValue,
}: AppSwitchProps) {
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();
  return (
    <View>
      <Controller
        defaultValue={defaultValue}
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          const onValueChange = (value: boolean) => {
            onChange(value);
            onChangeValue?.(value);
          };
          const {
            thumbColor = Colors.app.Shape_Base,
            inActiveTrackColor = Colors.app.Shape_Base,
            lableColor = Colors.app.Text_Title,
            activeTrackColor = Colors.app.Functional_Success,
          } = data;
          const getColorLabel = () => {
            return disabled ? Colors.app.Text_Disable : lableColor;
          };
          return (
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: Sizes.padding.default,
                },
                styleSwitch,
              ]}
            >
              <Switch
                testID={`switch${name}`}
                disabled={disabled}
                trackColor={{
                  false: inActiveTrackColor,
                  true: activeTrackColor,
                }}
                thumbColor={thumbColor}
                onValueChange={onValueChange}
                value={value}
              />
              <AppText
                style={[
                  {
                    color: getColorLabel(),
                  },
                  styleLable,
                ]}
              >
                {label}
              </AppText>
            </View>
          );
        }}
      />
    </View>
  );
}
