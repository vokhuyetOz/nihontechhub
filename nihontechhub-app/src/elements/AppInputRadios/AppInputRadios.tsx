import React from 'react';
import { Controller, UseControllerProps } from 'react-hook-form';
import { TextStyle, View, ViewStyle } from 'react-native';

import { Sizes, useAppTheme } from '@utils/modules';
import { AppText } from '../AppText';
import { Radios } from './Radios';

export type RadiosDataItem = {
  id?: number;
  label?: string;
};

export type RadiosProps = UseControllerProps & {
  data?: Array<RadiosDataItem>;
  onValueChange?: (args?: number) => void;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
  itemStyle?: Omit<ViewStyle, 'marginRight' | 'marginBottom'>;
  unselectedRadioStyle?: ViewStyle;
  selectedRadioStyle?: ViewStyle;
  labelStyle?: TextStyle;
  activeOpacity?: number;
  label?: string;
  testID?: string;
};

export function AppInputRadios({
  data,
  label,
  control,
  name,
  rules,
  containerStyle,
  labelStyle,
  defaultValue,
  ...radiosProps
}: RadiosProps) {
  const { Colors } = useAppTheme();
  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={containerStyle}>
          {!!label && (
            <AppText
              style={[
                {
                  paddingBottom: Sizes.padding.default * 0.5,
                  fontSize: Sizes.normal,
                },
                labelStyle,
              ]}
            >
              {label}
            </AppText>
          )}
          <Radios
            testID="myRadios"
            data={data}
            name={''}
            value={value}
            onValueChange={onChange}
            {...radiosProps}
          />
          {error?.message && (
            <AppText
              style={[
                {
                  color: Colors.app.Functional_Error,
                  fontSize: Sizes.small,
                  paddingTop: Sizes.padding.default * 0.25,
                },
              ]}
            >
              {error?.message}
            </AppText>
          )}
        </View>
      )}
    />
  );
}
