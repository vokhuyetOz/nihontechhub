//import liraries
import React, { ReactNode, useState } from 'react';

import { Controller, UseControllerProps } from 'react-hook-form';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { useAppSize, useAppTheme } from '@utils/modules';
import { ComonStyle } from '@utils/resource';

import { AppIcon, TypeIconName } from '../AppIcon';
import { AppText } from '../AppText';

import { ElementsStyle, useStyleInput } from './useStyleInput';

export type AppInputTextProps = UseControllerProps &
  Omit<TextInputProps, 'style' | 'defaultValue'> & {
    label?: string;
    description?: string | Element;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    renderRight?: () => any;
    renderLeft?: () => any;
    placeholder?: string;
    clearButton?: boolean;
  } & ElementsStyle;

export function AppInputText({
  control,
  name,
  label,
  description,
  defaultValue = '',
  rules,
  secureTextEntry,
  containerStyle,
  style,
  elSize,
  elVariant,
  placeholder,
  renderRight,
  renderLeft,
  clearButton,
  ...textInputProps
}: AppInputTextProps) {
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();
  const [secure, setSecure] = useState(secureTextEntry);
  const styleInput = useStyleInput({ elSize, elVariant });
  const renderSecure = () => {
    if (!secureTextEntry) {
      return null;
    }
    let icon = 'eye-off';
    if (!secure) {
      icon = 'eye';
    }
    return (
      <AppIcon
        hitSlop={1}
        onPress={() => {
          setSecure(!secure);
        }}
        name={icon as TypeIconName}
        type={'MaterialDesignIcons'}
        style={{
          paddingRight: Sizes.padding.large / 2,
        }}
        size={Sizes.large}
        color={Colors.input.textColor}
      />
    );
  };

  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const renderLabel = () => {
          if (!label) {
            return null;
          }
          let required: ReactNode = '';
          if (rules?.required) {
            required = (
              <AppText style={{ color: Colors.app.Functional_Error }}>
                *
              </AppText>
            );
          }
          return (
            <AppText
              style={{
                paddingBottom: Sizes.padding.large / 2,
                fontSize: Sizes.normal,
              }}
            >
              {label} {required}
            </AppText>
          );
        };
        const renderClearButton = () => {
          if (!clearButton) {
            return null;
          }
          return (
            <AppIcon
              hitSlop={1}
              onPress={() => {
                onChange('');
              }}
              name={'close-circle-outline'}
              style={{
                paddingRight: Sizes.padding.large / 2,
              }}
              size={Sizes.large}
              color={Colors.input.textColor}
            />
          );
        };
        return (
          <View style={containerStyle}>
            {renderLabel()}
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: Sizes.wpx(300),
                },
                styleInput.variant,
                style,
              ]}
            >
              {renderLeft?.()}
              <TextInput
                placeholder={placeholder}
                autoCapitalize={'none'}
                onChangeText={onChange}
                value={value}
                autoCorrect={false}
                spellCheck={false}
                style={[
                  {
                    color: Colors.app.Text_Title,
                    fontSize: Sizes.normal,
                    flex: 1,
                    paddingHorizontal: Sizes.padding.medium,
                  },
                  styleInput.size,
                ]}
                placeholderTextColor={Colors.app.Text_Disable}
                secureTextEntry={secure}
                {...textInputProps}
              />
              {renderSecure()}
              {renderClearButton()}
              {renderRight?.()}
            </View>
            {!!description && (
              <AppText style={ComonStyle.smaller}>
                {description as ReactNode}
              </AppText>
            )}
            {error?.message && (
              <AppText
                style={{
                  color: Colors.app.Functional_Error,
                  paddingTop: Sizes.padding.default / 4,
                  fontSize: Sizes.small,
                }}
              >
                {error?.message}
              </AppText>
            )}
          </View>
        );
      }}
    />
  );
}
