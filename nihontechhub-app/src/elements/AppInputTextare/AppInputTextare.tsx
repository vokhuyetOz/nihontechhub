import { useAppLanguage, useAppTheme } from '@utils/modules';
import { useAppSize } from '@utils/modules/Size/useAppSize';
import React from 'react';
import { Controller, UseControllerProps, useFormState } from 'react-hook-form';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { AppText } from '../AppText';

export type AppInputTextareaProps = UseControllerProps &
  Omit<TextInputProps, 'style' | 'defaultValue'> & {
    label?: string;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    renderRight?: () => JSX.Element;
    disabled?: boolean;
    height?: number;
    width?: number;
    maxLength?: number;
    elSize?: 'small' | 'medium' | 'large';
    elVariant?: 'default' | 'success' | 'error';
  };

export function AppInputTextarea({
  disabled,
  control,
  name,
  label,
  defaultValue = '',
  rules,
  inputStyle,
  containerStyle,
  style,
  // elVariant,
  maxLength = 500,
  height = 100,
  width = 300,
  ...textInputProps
}: AppInputTextareaProps): JSX.Element {
  const { Colors } = useAppTheme();
  const { Strings } = useAppLanguage();
  const { Sizes } = useAppSize();
  const { errors } = useFormState({ control, name });
  const checkError = !!errors[name];
  // if (checkError) {
  //   elVariant = 'error';
  // }
  const colorTextInput = checkError
    ? Colors.app.Functional_Error
    : Colors.app.Text_Secondary;
  // const colorTextare = disabled
  //   ? Colors.app.Text_Disable
  //   : Colors.app.Text_Title;
  const renderRemainLength = (value: string) => {
    const length = value?.length;
    if (length > maxLength) {
      return null;
    }
    return (
      <Text
        style={{
          position: 'absolute',
          bottom: -24,
          right: 0,
          color: colorTextInput,
        }}
      >
        {maxLength - length}
        {Strings.Character}
      </Text>
    );
  };
  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <View style={containerStyle}>
            {!!label && (
              <AppText
                style={{
                  paddingBottom: Sizes.padding.default / 2,
                  fontSize: Sizes.normal,
                }}
              >
                {label}
              </AppText>
            )}
            <View
              style={[
                {
                  width,
                  flexDirection: 'column',
                  borderWidth: 1,
                  borderRadius: Sizes.border_radius,
                  borderColor: Colors.app.Shape_Border,
                },
                style,
              ]}
            >
              <View style={{ paddingHorizontal: Sizes.padding.default * 0.8 }}>
                <TextInput
                  multiline
                  editable={!disabled}
                  selectTextOnFocus={!disabled}
                  placeholder="something.....!"
                  // maxLength={rules?.maxLength as number}
                  autoCapitalize={'none'}
                  onChangeText={e => {
                    if (e.startsWith(' ')) {
                      return;
                    }
                    onChange(e);
                  }}
                  value={value}
                  autoCorrect={false}
                  spellCheck={false}
                  style={[
                    {
                      lineHeight: 22,
                      height,
                      // color: colorTextare,
                      fontSize: Sizes.normal,
                    },
                    inputStyle,
                  ]}
                  placeholderTextColor={Colors.app.Text_Disable}
                  {...textInputProps}
                />
                {/* <View style={{position: 'absolute', bottom: 2, right: 2}}>
                  <IconTextarea />
                </View> */}
              </View>

              {/* <Text
                style={{
                  position: 'absolute',
                  bottom: -24,
                  right: 0,
                  color: colorTextInput,
                }}>
                {value.length}/
                {typeof rules?.maxLength === 'number'
                  ? rules?.maxLength
                  : rules?.maxLength?.value ?? '.'}
              </Text> */}
              {renderRemainLength(value)}
            </View>

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
