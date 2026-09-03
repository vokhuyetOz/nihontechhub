import React from 'react';

import { View } from 'react-native';

import { TNews } from '@utils/modules/FetchApi/News/NewsAPI';
import { useAppSize } from '@utils/modules/Size/useAppSize';
import { AppBadge } from '@elements/AppBadge/AppBadge';
import { AppTouchable } from '@elements/AppTouchable';
import { useNavigation } from '@react-navigation/native';
import { TabStackScreenProps } from '@utils/navigation/types';

export function TopNewsItemTag({ data }: Readonly<{ data: TNews['tags'] }>) {
  const { Sizes } = useAppSize();

  const navigation = useNavigation<TabStackScreenProps<'Tag'>['navigation']>();

  const onPress = (tag: string) => () => {
    navigation.push('Tag', { data: tag });
  };
  if (!data?.length) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: Sizes.padding.small,
      }}
    >
      {data.map((tag, index) => {
        if (!tag) {
          return null;
        }
        return (
          <AppTouchable key={`${tag}-${index}`} onPress={onPress(tag)}>
            <AppBadge>{tag}</AppBadge>
          </AppTouchable>
        );
      })}
    </View>
  );
}
