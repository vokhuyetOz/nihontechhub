import React from 'react';

import { View, ViewStyle } from 'react-native';

import { AppImage } from '@elements/AppImage';
import { AppText } from '@elements/AppText';
import { AppTouchable } from '@elements/AppTouchable';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import {
  getSentences,
  joinSentences,
  useAppTheme,
  useHeaderHeight,
} from '@utils/modules';
import { TNews } from '@utils/modules/FetchApi/News/NewsAPI';
import { useAppSize } from '@utils/modules/Size/useAppSize';
import { TabStackScreenProps } from '@utils/navigation/types';
import { ComonStyle, randomPlaceholderColor } from '@utils/resource';

import { TopNewsItemKeyword } from './TopNewsItemKeyword';

export function SPTopNewsForYouItem({
  data,
  style,
}: Readonly<{
  data: TNews;
  index: number;
  style?: ViewStyle;
  extra?: { viewCount?: number };
}>) {
  const { Sizes } = useAppSize();
  const { Colors } = useAppTheme();
  const tabBarHeight = useBottomTabBarHeight();
  const headerHeight = useHeaderHeight();
  const navigation =
    useNavigation<TabStackScreenProps<'TopPage'>['navigation']>();

  const onPress = () => {
    navigation.push('NewsDetail', {
      data,
    });
  };

  const itemWidth = Sizes.device_width - Sizes.padding.default * 2;
  const height =
    Sizes.device_height - tabBarHeight - headerHeight - Sizes.tabbar;

  let keywords = data.keywords?.slice(0, 5);
  if (!keywords?.length) {
    keywords = data.tags;
  }

  return (
    <View
      style={[
        ComonStyle.center,
        {
          width: Sizes.device_width,
          height,
          paddingHorizontal: Sizes.padding.default,
        },
      ]}
    >
      <AppTouchable
        onPress={onPress}
        activeOpacity={1}
        style={[
          ComonStyle.shadow(),
          {
            width: itemWidth,
            paddingBottom: Sizes.padding.small,
            borderRadius: Sizes.border_radius,
            backgroundColor: Colors.app.Background_Base,
            justifyContent: 'flex-end',
            flex: 1,
            marginVertical: Sizes.padding.small,
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
            position: 'absolute',
            top: 0,
          }}
          resizeMode="cover"
        />
        <View
          style={{
            alignSelf: 'flex-end',
            backgroundColor: Colors.app.Background_Base,
          }}
        >
          <AppText
            style={[
              ComonStyle.bold,
              ComonStyle.heading1,
              {
                paddingHorizontal: Sizes.padding.small,
                paddingTop: Sizes.padding.small,
              },
            ]}
          >
            {data.title}
          </AppText>
          <AppText
            style={[
              ComonStyle.large,
              {
                paddingTop: Sizes.padding.small,
                paddingHorizontal: Sizes.padding.small,
              },
            ]}
          >
            {joinSentences(getSentences(data.summary))}
          </AppText>
          <TopNewsItemKeyword data={keywords} />
        </View>
      </AppTouchable>
    </View>
  );
}
