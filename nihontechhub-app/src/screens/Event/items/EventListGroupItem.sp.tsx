import React from 'react';

import { View } from 'react-native';

import { AppText } from '@elements/AppText';
import { AppTouchable } from '@elements/AppTouchable';
import { useAppLanguage, useAppTheme } from '@utils/modules';
import { useAppSize } from '@utils/modules/Size/useAppSize';
import { ComonStyle } from '@utils/resource';

import { AppBadge } from '@elements/AppBadge/AppBadge';
import { TopNewsItemTag } from '@screens/TopPage/items/TopNewsItemTag';
import {
  getImpactStyles,
  useHandleItem,
} from '@screens/Highlight/modules/useHandleItem';
import { TEvent } from '@utils/modules/FetchApi/Event/EventAPI';
import { AppDivider } from '@elements/AppDivider/AppDivider';

export function SPEventListGroupItem({
  data,
}: Readonly<{ data: TEvent; index: number }>) {
  const { Sizes } = useAppSize();
  const { Colors } = useAppTheme();
  const { Strings } = useAppLanguage();

  const { summary, needsReadMore, expanded, setExpanded } = useHandleItem(data);

  const onPress = () => {
    setExpanded(prev => !prev);
  };
  const itemWidth = Sizes.device_width - 60 - Sizes.padding.default * 2;
  const styles = getImpactStyles(data.impact);

  return (
    <AppTouchable
      onPress={onPress}
      style={[
        ComonStyle.shadow(),
        {
          width: itemWidth,
          marginLeft: Sizes.padding.small,
          marginBottom: Sizes.padding.default,
          paddingBottom: Sizes.padding.huge,
          borderRadius: Sizes.border_radius,
          backgroundColor: Colors.app.Background_Base,
          borderLeftWidth: 4,
          borderLeftColor: styles.borderColor,
        },
      ]}
    >
      <View style={{ flexDirection: 'row', paddingTop: Sizes.padding.default }}>
        <AppBadge
          style={{
            color: styles.badgeText,
            backgroundColor: styles.badgeBg,
            borderColor: styles.borderColor,
          }}
        >
          {Strings.xImpact(data.impact)}
        </AppBadge>
        <AppBadge
          style={{
            color: '#fff',
            backgroundColor: '#2563eb',
          }}
        >
          {Strings.AISynthesized}
        </AppBadge>
      </View>
      <AppText
        style={[
          ComonStyle.bold,
          ComonStyle.heading1,
          {
            paddingHorizontal: Sizes.padding.small,
            marginTop: Sizes.padding.default,
          },
        ]}
        numberOfLines={3}
      >
        {data.title}
      </AppText>

      <AppText
        style={[
          ComonStyle.large,
          {
            padding: Sizes.padding.small,
            marginBottom: Sizes.padding.small,
          },
        ]}
      >
        {summary}
      </AppText>
      {needsReadMore && (
        <AppTouchable
          style={{
            paddingHorizontal: Sizes.padding.small,
            paddingVertical: Sizes.padding.small,
          }}
          hitSlop={Sizes.padding.small}
          onPress={onPress}
        >
          <AppText
            style={[
              ComonStyle.large,
              {
                textDecorationLine: 'underline',
                color: Colors.app.Functional_Link,
              },
            ]}
          >
            {expanded ? Strings.Show_less : Strings.Read_more}
          </AppText>
        </AppTouchable>
      )}
      <TopNewsItemTag data={data.keywords} />
      <AppDivider
        offset={Sizes.padding.default}
        style={{ marginVertical: Sizes.padding.default }}
      />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingHorizontal: Sizes.padding.default,
          alignItems: 'center',
        }}
      >
        <AppText style={{ color: '#2563eb', fontWeight: '600' }}>
          {Strings.AIAggregatedFrom}:
        </AppText>
        {data.feeds?.map((item, index) => (
          <AppBadge
            key={`${index}`}
            style={{
              textTransform: 'none',
              paddingHorizontal: Sizes.padding.small,
              fontWeight: '700',
            }}
          >
            {item}
          </AppBadge>
        ))}
      </View>
    </AppTouchable>
  );
}
