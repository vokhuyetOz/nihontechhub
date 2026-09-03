import React, { useState } from 'react';

import { View } from 'react-native';

import { AppDivider } from '@elements/AppDivider/AppDivider';
import { AppIcon } from '@elements/AppIcon';
import { AppText } from '@elements/AppText';
import { AppTouchable } from '@elements/AppTouchable';
import {
  LanguageService,
  useAppLanguage,
  useAppSize,
  useAppTheme,
} from '@utils/modules';
import { CheckLogic, ComonStyle } from '@utils/resource';

type LanguageKey = keyof typeof CheckLogic.Language_code;
type TypeLanguageItemData = {
  label: string;
  value?: (typeof CheckLogic.Language_code)[LanguageKey];
};
type TypeLanguageItemProp = {
  data: TypeLanguageItemData;
  onPress: () => void;
  selected: boolean;
};
function LanguageItem({ data, onPress, selected }: TypeLanguageItemProp) {
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();
  return (
    <AppTouchable
      onPress={onPress}
      style={{
        width: Sizes.device_width,
        paddingHorizontal: Sizes.padding.default,
      }}
    >
      <View
        style={[
          ComonStyle.borderBottom(Colors.app.Text_Base),
          {
            paddingVertical: Sizes.padding.default,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}
      >
        <AppText
          style={{
            fontWeight: '500',
          }}
        >
          {data.label}
        </AppText>
        {!!selected && (
          <AppIcon
            name={'check'}
            color={Colors.app.Functional_Success}
            size={Sizes.larger}
          />
        )}
      </View>
      <AppDivider />
    </AppTouchable>
  );
}
function LanguageList(): React.JSX.Element {
  const { Strings, setLanguageCode } = useAppLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(
    LanguageService.getCode(),
  );
  const languages = [
    {
      label: Strings.Japanese,
      value: CheckLogic.Language_code.ja,
    },
    {
      label: Strings.English,
      value: CheckLogic.Language_code.en,
    },
  ];

  return (
    <View>
      {languages.map(item => {
        return (
          <LanguageItem
            key={item.value}
            data={item}
            onPress={() => {
              if (selectedLanguage !== item.value) {
                setSelectedLanguage(item.value);
                setLanguageCode(item.value);
              }
            }}
            selected={selectedLanguage === item.value}
          />
        );
      })}
    </View>
  );
}
export { LanguageList };
