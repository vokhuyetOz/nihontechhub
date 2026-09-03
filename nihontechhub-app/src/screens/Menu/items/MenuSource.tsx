import React from 'react';

import { Pressable, View } from 'react-native';

import { AppText } from '@elements/AppText';
import { useAppSize, useAppTheme } from '@utils/modules';
import { AppDivider } from '@elements/AppDivider/AppDivider';
import { useQuerySource } from '../modules/useQuerySource';
import { TCategory } from '@utils/modules/FetchApi/Category/CategoryType';
import { useNavigation } from '@react-navigation/native';
import { ComonStyle } from '@utils/resource';

type TMenuSourceItem = {
  data: TCategory;
};

function MenuSourceItem({ data }: TMenuSourceItem) {
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Cate', {
      data: data.value,
    });
  };
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          padding: Sizes.padding.default,
        }}
      >
        <AppText>{data.label}</AppText>
        <AppText
          style={[ComonStyle.little, { color: Colors.app.Text_Secondary }]}
        >
          {data.value}
        </AppText>
      </View>
      <AppDivider
        style={{
          marginHorizontal: Sizes.padding.default,
        }}
      />
    </Pressable>
  );
}
export function MenuSource() {
  const { Sizes } = useAppSize();

  const { data } = useQuerySource();

  if (!data?.length) {
    return null;
  }
  return (
    <View style={{ paddingBottom: Sizes.padding.default }}>
      {data.map(item => {
        return <MenuSourceItem data={item} key={item.value} />;
      })}
    </View>
  );
}
