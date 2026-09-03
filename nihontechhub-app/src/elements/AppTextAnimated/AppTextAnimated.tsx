import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import {
  Text,
  TextInputProps,
  TextStyle,
  View,
  StyleSheet,
} from 'react-native';
import Animated, { useAnimatedProps } from 'react-native-reanimated';

type TextProps = Omit<TextInputProps, 'value' | 'style'> & {
  text: Animated.SharedValue<string>;
  style?: TextStyle;
  valueSuffix?: string;
  valuePrefix?: string;
  styleText?: TextStyle;
};

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export function AppTextAnimated(props: TextProps) {
  const { style, styleText, text, valueSuffix, valuePrefix, ...rest } = props;
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
    } as object;
  });
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      {valueSuffix && (
        <Text style={[styles.baseStyle, style, styleText]}>{valueSuffix}</Text>
      )}
      <AnimatedTextInput
        testID="progress-text"
        underlineColorAndroid="transparent"
        editable={false}
        value={text.value}
        style={[styles.baseStyle, style, styleText]}
        {...rest}
        {...{ animatedProps }}
      />
      {valuePrefix && (
        <Text style={[styles.baseStyle, style, styleText]}>{valuePrefix}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  baseStyle: {
    color: 'black',
  },
});
