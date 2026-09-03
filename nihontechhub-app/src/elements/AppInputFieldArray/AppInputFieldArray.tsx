//import liraries
import React, { ReactNode, useState } from 'react';

import { Control, Controller, UseControllerProps } from 'react-hook-form';
import { StyleProp, TextInput, View, ViewStyle } from 'react-native';

import { Sizes, useAppTheme } from '@utils/modules';

import { AppIcon } from '../AppIcon';

export type AppInputFieldArrayProps = UseControllerProps & {
  control: Control;
  fieldArrayName: string;
  fieldArrayItemIndex: number;
  fieldArrayItemChildKey?: string;
  defaultValue?: string;
  secureTextEntry?: boolean;
  inputStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  renderRight?: () => ReactNode;
  placeholder?: string;
  name?: string;
};

export function AppInputFieldArray({
  control,
  fieldArrayName,
  fieldArrayItemIndex,
  fieldArrayItemChildKey,
  defaultValue = '',
  rules,
  secureTextEntry,
  inputStyle,
  containerStyle,
  style,
  renderRight,
  placeholder,
  ...inputProps
}: Readonly<AppInputFieldArrayProps>) {
  const { Colors } = useAppTheme();
  const [secure, setSecure] = useState(secureTextEntry);

  const getName = () => {
    let result = '';
    if (fieldArrayName) {
      result += fieldArrayName;
    }
    if (fieldArrayItemIndex !== undefined) {
      result += `.${fieldArrayItemIndex}`;
    }
    if (fieldArrayItemChildKey !== undefined) {
      result += `.${fieldArrayItemChildKey}`;
    }
    return result;
  };

  const getMaxLength = () => {
    if (typeof rules?.maxLength === 'number') {
      return rules?.maxLength;
    }

    return undefined;
  };

  const renderSecure = () => {
    if (!secureTextEntry) {
      return null;
    }
    let icon = 'eye';

    if (!secure) {
      icon = 'eye-off-outline';
    }

    return (
      <AppIcon
        hitSlop
        onPress={() => {
          setSecure(!secure);
        }}
        name={icon}
        type={'MaterialDesignIcons'}
        style={{
          paddingRight: Sizes.padding.default,
        }}
        size={Sizes.normal}
        color={Colors.input.placeholder}
      />
    );
  };

  return (
    <View style={containerStyle}>
      <View
        style={[
          {
            flexDirection: 'row',
            borderWidth: Sizes.border,
            borderColor: Colors.input.textColor,
            borderRadius: Sizes.border_radius,
            alignItems: 'center',
          },
          style,
        ]}
      >
        <Controller
          name={getName()}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                maxLength={getMaxLength()}
                defaultValue={defaultValue}
                autoCapitalize={'none'}
                onChangeText={onChange}
                value={value}
                autoCorrect={false}
                spellCheck={false}
                style={[
                  {
                    color: Colors.input.textColor,
                    fontSize: Sizes.small,
                    flex: 1,
                    paddingHorizontal: Sizes.padding.default,
                    paddingVertical: Sizes.padding.default * 0.9,
                  },
                  inputStyle,
                ]}
                placeholder={placeholder}
                placeholderTextColor={Colors.input.placeholder}
                secureTextEntry={secure}
                {...inputProps}
              />
            );
          }}
        />
        {renderSecure?.()}
        {renderRight?.()}
      </View>
    </View>
  );
}
