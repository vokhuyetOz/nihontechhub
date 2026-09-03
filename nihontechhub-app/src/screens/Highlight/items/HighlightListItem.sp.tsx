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

export function SPHighlightListItem({
  data,
  index,
}: Readonly<{ data: THighlight; index: number }>) {
  const { Sizes } = useAppSize();
  const { Colors } = useAppTheme();
  const { Strings } = useAppLanguage();

  const { imageUrl, summary, needsReadMore, expanded, setExpanded } =
    useHandleItem(data);

  let marginTop = 0;
  if (index === 0) {
    marginTop = Sizes.padding.default;
  }
  const itemWidth = Sizes.device_width - Sizes.padding.default * 2;
  const onPressReadMore = () => setExpanded(prev => !prev);

  return (
    <AppTouchable onPress={onPressReadMore}>
      <View
        style={[
          ComonStyle.shadow(),
          {
            width: itemWidth,
            marginLeft: Sizes.padding.default,
            marginBottom: Sizes.padding.default,
            marginTop,
            paddingBottom: Sizes.padding.huge,
            borderRadius: Sizes.border_radius,
            backgroundColor: Colors.app.Background_Base,
          },
        ]}
      >
        <AppImage
          source={{ uri: imageUrl }}
          style={{
            width: itemWidth,
            height: (itemWidth * 9) / 16,
            backgroundColor: randomPlaceholderColor(),
            borderTopLeftRadius: Sizes.border_radius,
            borderTopRightRadius: Sizes.border_radius,
          }}
          resizeMode="cover"
        />

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
            onPress={onPressReadMore}
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
        <View
          style={{
            position: 'absolute',
            top: Sizes.padding.small,
            left: Sizes.padding.small,
          }}
        >
          <AppBadge
            style={{
              backgroundColor: 'rgba(0, 122, 255, 0.5)',
              color: Colors.app.Background_Base,
              textTransform: 'capitalize',
            }}
          >
            {Strings.AICurated}
          </AppBadge>
        </View>
      </View>
    </AppTouchable>
  );
}
