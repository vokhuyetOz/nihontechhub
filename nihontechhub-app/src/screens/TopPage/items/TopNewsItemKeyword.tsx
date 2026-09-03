import React from 'react';

import { View } from 'react-native';

import { TNews } from '@utils/modules/FetchApi/News/NewsAPI';
import { useAppSize } from '@utils/modules/Size/useAppSize';
import { AppBadge } from '@elements/AppBadge/AppBadge';
import { AppText } from '@elements/AppText';
import { ComonStyle } from '@utils/resource';
import { useAppLanguage, useAppTheme } from '@utils/modules';

export function TopNewsItemKeyword({
  data,
}: Readonly<{ data: TNews['keywords'] }>) {
  const { Sizes } = useAppSize();
  const { Strings } = useAppLanguage();
  const { Colors } = useAppTheme();

  if (!data?.length) {
    return null;
  }

  return (
    <View style={{ marginTop: Sizes.padding.default }}>
      <AppText style={[ComonStyle.large, ComonStyle.bold]}>
        {Strings.Keyword}
      </AppText>
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
            <View
              key={`${tag}-${index}`}
              style={{ marginRight: Sizes.padding.small }}
            >
              <AppBadge style={{ backgroundColor: Colors.app.Shape_Disable }}>
                {tag}
              </AppBadge>
            </View>
          );
        })}
      </View>
    </View>
  );
}
