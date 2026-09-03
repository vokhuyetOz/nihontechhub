import React from 'react';

import { View, ViewStyle } from 'react-native';

import { AppImage } from '@elements/AppImage';
import { AppText } from '@elements/AppText';
import { AppTouchable } from '@elements/AppTouchable';
import { useNavigation } from '@react-navigation/native';
import {
  formatDate,
  getSentences,
  joinSentences,
  useAppTheme,
} from '@utils/modules';
import { useAppSize } from '@utils/modules/Size/useAppSize';
import { TabStackScreenProps } from '@utils/navigation/types';
import { ComonStyle, randomPlaceholderColor } from '@utils/resource';

import { TopNewsItemPublisher } from './TopNewsItemPublisher';
import { TNews } from '@utils/modules/FetchApi/News/NewsAPI';
import { TopNewsItemTag } from './TopNewsItemTag';
import { TopNewsItemSource } from './TopNewsItemSource';
import { TopNewsItemRead } from './TopNewsItemRead';

export function TBTopNewsItem({
  data,
  style,
  extra,
}: Readonly<{
  data: TNews;
  index: number;
  style?: ViewStyle;
  extra?: { viewCount?: number };
}>) {
  const { Sizes } = useAppSize();
  const { Colors } = useAppTheme();
  const navigation =
    useNavigation<TabStackScreenProps<'TopPage'>['navigation']>();

  const onPress = () => {
    navigation.push('NewsDetail', {
      data,
    });
  };

  let itemWidth = Sizes.device_width / 2 - Sizes.padding.default * 1.5;

  return (
    <AppTouchable
      onPress={onPress}
      style={[
        ComonStyle.shadow(),
        {
          width: itemWidth,
          marginLeft: Sizes.padding.default,
          marginBottom: Sizes.padding.default,
          marginTop: Sizes.padding.default,
          paddingBottom: Sizes.padding.huge,
          borderRadius: Sizes.border_radius,
          backgroundColor: Colors.app.Background_Base,
        },
        style,
      ]}
    >
      <AppImage
        source={{ uri: data.imageUrl }}
        style={{
          width: itemWidth,
          height: (itemWidth * 9) / 16,
          backgroundColor: randomPlaceholderColor(),
          borderTopLeftRadius: Sizes.border_radius,
          borderTopRightRadius: Sizes.border_radius,
        }}
        resizeMode="cover"
      />

      {/* <TopFeedItemAction data={data} /> */}
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
      <TopNewsItemRead data={data.content} viewCount={extra?.viewCount} />
      <AppText
        style={[
          ComonStyle.large,
          {
            padding: Sizes.padding.small,
            marginBottom: Sizes.padding.small,
          },
        ]}
        numberOfLines={5}
      >
        {joinSentences(getSentences(data.summary))}
      </AppText>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: Sizes.padding.small,
        }}
      >
        <TopNewsItemPublisher data={data?.author} />
        <AppText>{formatDate(data.updatedAt)}</AppText>
      </View>
      <TopNewsItemTag data={data.tags} />
      <TopNewsItemSource data={data.source} />
    </AppTouchable>
  );
}
