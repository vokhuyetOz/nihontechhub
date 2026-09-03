import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { ScrollView, View, ViewStyle } from 'react-native';

import { AppIcon } from '@elements/AppIcon';
import { AppText } from '@elements/AppText';
import { AppTouchable } from '@elements/AppTouchable';
import { Sizes, useAppTheme } from '@utils/modules';

type TAppCheckBox = Readonly<{
  name: string;
  defaultValue?: Array<string>;
  answerList?: Array<string>;
  containerStyle?: ViewStyle;
  control: Control;
}>;
export function AppCheckBox({
  name,
  defaultValue = [],
  containerStyle,
  control,
  answerList = [],
}: TAppCheckBox) {
  return (
    <Controller
      defaultValue={defaultValue}
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <View style={{ flex: 1, ...containerStyle }}>
            <ScrollView>
              {answerList.map(item => (
                <CheckBoxItem
                  key={item}
                  label={item}
                  value={value}
                  onChange={onChange}
                />
              ))}
            </ScrollView>
          </View>
        );
      }}
    />
  );
}

type TCheckBoxItem = Readonly<{
  label: string;
  value: Array<string>;
  onChange(value: any): void;
}>;
function CheckBoxItem({ label, value = [], onChange }: TCheckBoxItem) {
  const { Colors } = useAppTheme();
  const [isChecked, setIsChecked] = useState(value?.includes(label));
  const onPress = () => {
    if (!isChecked) {
      setIsChecked(true);
      value.push(label);
      onChange(value);
    } else {
      setIsChecked(false);
      const index = value.indexOf(label);
      if (index > -1) {
        value.splice(index, 1);
        onChange(value);
      }
    }
  };
  return (
    <AppTouchable
      onPress={onPress}
      style={{
        height: Sizes.wpx(48),
        paddingHorizontal: Sizes.wpx(16),
        borderRadius: Sizes.wpx(20),
        marginTop: Sizes.wpx(10),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: isChecked
          ? Colors.button.yesSelection
          : Colors.button.noSelection,
      }}
    >
      <View
        style={{
          width: Sizes.wpx(18),
          height: Sizes.wpx(18),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
          backgroundColor: isChecked
            ? Colors.app.Primary
            : Colors.app.Background_Base,
          borderColor: isChecked ? Colors.app.Primary : Colors.input.border,
          borderWidth: 1,
        }}
      >
        <AppIcon
          type={'FontAwesome'}
          name={'check'}
          size={15}
          color={Colors.app.Background_Base}
        />
      </View>
      <AppText
        style={{
          fontSize: Sizes.small,
          color: Colors.app.Text_Extra,
          marginLeft: Sizes.wpx(10),
        }}
      >
        {label}
      </AppText>
    </AppTouchable>
  );
}
