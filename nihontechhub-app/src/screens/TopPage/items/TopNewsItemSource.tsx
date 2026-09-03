import React from 'react';

import { useAppTheme } from '@utils/modules';
import { TNews } from '@utils/modules/FetchApi/News/NewsAPI';
import { useAppSize } from '@utils/modules/Size/useAppSize';
import { AppBadge } from '@elements/AppBadge/AppBadge';
import { AppTouchable } from '@elements/AppTouchable';
import { useNavigation } from '@react-navigation/native';
import { TabStackScreenProps } from '@utils/navigation/types';

export function TopNewsItemSource({
  data,
}: Readonly<{ data: TNews['source'] }>) {
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();

  const navigation = useNavigation<TabStackScreenProps<'Cate'>['navigation']>();

  const onPress = () => {
    navigation.push('Cate', { data });
  };

  if (!data) {
    return null;
  }

  return (
    <AppTouchable
      onPress={onPress}
      style={{
        position: 'absolute',
        top: Sizes.padding.small,
        left: Sizes.padding.small,
      }}
    >
      <AppBadge
        style={{
          backgroundColor: 'rgba(0, 122, 255, 0.6)',
          color: Colors.app.Background_Base,
          textTransform: 'capitalize',
        }}
      >
        {data}
      </AppBadge>
    </AppTouchable>
  );
}
