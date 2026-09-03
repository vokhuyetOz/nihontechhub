import React from 'react';

import { View } from 'react-native';

import { AppText } from '@elements/AppText/AppText';
import { useAppSize, useAppTheme } from '@utils/modules';
import { ComonStyle } from '@utils/resource';

import { useReportSelectedFeed } from '../modules/useReportSelectedFeed';

export function ReportHeading() {
  const { Sizes } = useAppSize();
  const { Colors } = useAppTheme();
  const feed = useReportSelectedFeed();
  return (
    <View>
      <AppText
        style={[
          ComonStyle.bold,
          {
            fontSize: Sizes.heading1,
            textAlign: 'left',
          },
        ]}
        numberOfLines={1}
      >
        {feed?.name}
      </AppText>
      <AppText
        style={{
          textAlign: 'left',
          paddingTop: Sizes.padding.small,
          color: Colors.app.Text_Secondary,
        }}
        numberOfLines={1}
      >
        {feed?.summary}...
      </AppText>
    </View>
  );
}
