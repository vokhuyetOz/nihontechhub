import React from 'react';

import { View } from 'react-native';

import { AppInputText } from '@elements/AppInputText';
import { useAppLanguage, useAppSize, useAppTheme } from '@utils/modules';
import { ComonStyle } from '@utils/resource';

export function SearchHeader() {
  const { Colors } = useAppTheme();
  const { Strings } = useAppLanguage();
  const { Sizes } = useAppSize();

  return (
    <View
      style={[
        ComonStyle.center,
        ComonStyle.shadow(),
        {
          alignSelf: 'center',
          backgroundColor: Colors.app.Background_Base,
          paddingHorizontal: Sizes.padding.default,
          marginTop: Sizes.padding.default,
        },
      ]}
    >
      <AppInputText
        name="searchKey"
        placeholder={Strings.Search_placeholder}
        autoFocus
      />
    </View>
  );
}
