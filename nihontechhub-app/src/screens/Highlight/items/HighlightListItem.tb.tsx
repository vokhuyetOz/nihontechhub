import React from 'react';

import { View } from 'react-native';

import { AppImage } from '@elements/AppImage';
import { AppText } from '@elements/AppText';
import { AppTouchable } from '@elements/AppTouchable';
import { getDateString, useAppLanguage, useAppTheme } from '@utils/modules';
import { useAppSize } from '@utils/modules/Size/useAppSize';
import { ComonStyle, randomPlaceholderColor } from '@utils/resource';

import { THighlight } from '@utils/modules/FetchApi/Highlight/HighlightAPI';
import { getImpactColor, useHandleItem } from '../modules/useHandleItem';
import { AppBadge } from '@elements/AppBadge/AppBadge';
import { TopNewsItemTag } from '@screens/TopPage/items/TopNewsItemTag';

export function TBHighlightListItem({
  data,
  index,
}: Readonly<{ data: THighlight; index: number }>) {
  const { Sizes } = useAppSize();
  const { Colors } = useAppTheme();
  const { Strings } = useAppLanguage();

  const { imageUrl, summary, needsReadMore, expanded, setExpanded } =
    useHandleItem(data);

  const onPress = () => {
    setExpanded(pre => !pre);
  };

  let marginTop = 0;
  if (index === 0) {
    marginTop = Sizes.padding.default;
  }
  const itemWidth = Sizes.device_width / 3;

  return (
    <AppTouchable
      onPress={onPress}
      style={[
        ComonStyle.shadow(),
        {
          flexDirection: 'row',
          marginTop,
          marginHorizontal: Sizes.padding.default,
          marginBottom: Sizes.padding.default,
          borderRadius: Sizes.border_radius,
          backgroundColor: Colors.app.Background_Base,
          flex: 1,
        },
      ]}
    >
      <View>
        <AppImage
          source={{ uri: imageUrl }}
          style={{
            width: itemWidth,
            height: (itemWidth * 9) / 16,
            backgroundColor: randomPlaceholderColor(),
            borderRadius: Sizes.border_radius,
          }}
          resizeMode="cover"
        />
      </View>

      <View
        style={{
          paddingLeft: Sizes.padding.small,
          paddingBottom: Sizes.padding.huge,
          flex: 1,
        }}
      >
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
        <AppBadge
          style={{
            ...ComonStyle.border('transparent'),
            ...getImpactColor(data.type),
            alignSelf: 'flex-start',
            marginTop: Sizes.padding.small,
          }}
        >
          {Strings.highlightType[data.type] ?? data.type}
        </AppBadge>
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <AppText
            style={[ComonStyle.smaller, { color: Colors.app.Text_HighLight }]}
          >
            {Strings.X_articles(data.articles?.length ?? 1)}
          </AppText>
          <AppText
            style={[ComonStyle.smaller, { color: Colors.app.Text_Secondary }]}
          >
            {getDateString(data.earliestPublished)}
          </AppText>
        </View>

        <AppText
          style={[
            ComonStyle.large,
            {
              padding: Sizes.padding.small,
              marginBottom: Sizes.padding.small,
              flex: 1,
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
      </View>
    </AppTouchable>
  );
}
