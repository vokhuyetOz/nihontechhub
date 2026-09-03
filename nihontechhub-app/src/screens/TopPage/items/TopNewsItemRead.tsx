import React from 'react';
import { View } from 'react-native';

import {
  Convert,
  estimateReadTime,
  useAppLanguage,
  useAppTheme,
} from '@utils/modules';
import { useAppSize } from '@utils/modules/Size/useAppSize';
import { AppBadge } from '@elements/AppBadge/AppBadge';

export function TopNewsItemRead({
  data,
  viewCount,
}: Readonly<{ data: string; viewCount?: number }>) {
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();

  const { Strings } = useAppLanguage();

  if (!data) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: Sizes.padding.medium,
      }}
    >
      <AppBadge
        style={{
          color: Colors.app.Text_HighLight,
          alignSelf: 'flex-start',
          borderColor: Colors.app.Text_HighLight,
        }}
      >
        {Strings.X_min_read(estimateReadTime(data))}
      </AppBadge>
      {viewCount && viewCount > 10 && (
        <AppBadge>{Strings.X_view(Convert.formatNumber(viewCount))}</AppBadge>
      )}
    </View>
  );
}
