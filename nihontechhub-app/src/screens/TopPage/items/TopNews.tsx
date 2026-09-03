import { AppViewLoading } from '@elements/AppViewLoading';
import { FlashList } from '@shopify/flash-list';
import { useState } from 'react';

import { TabView, SceneMap, TabBar, TabBarProps } from 'react-native-tab-view';
import { isTablet } from 'react-native-device-info';

import { useQueryNews } from '../modules/useQueryNews';

import { AppViewError } from '@elements/AppViewError';
import { TopNewsItem } from './TopNewsItem';
import { useAppLanguage, useAppSize, useAppTheme } from '@utils/modules';
import { useQueryNewsMost } from '../modules/useQueryNewsMost';
import { useQueryNewsForYou } from '../modules/useQueryNewsForYou';
import { TopNewsForYouItem } from './TopNewsForyouItem';

function TopNewsForYou() {
  const { Sizes } = useAppSize();
  const { list, hasNextPage, fetchNextPage, error, refetch, isRefetching } =
    useQueryNewsForYou();

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (error && !list?.length) {
    return <AppViewError onPress={refetch} title={error.message} />;
  }
  const tablet = isTablet();
  return (
    <FlashList
      refreshing={isRefetching}
      onRefresh={refetch}
      pagingEnabled={!tablet}
      numColumns={Sizes.masonry_column}
      showsVerticalScrollIndicator={tablet}
      data={list}
      renderItem={({ item, index }) => (
        <TopNewsForYouItem data={item} index={index} />
      )}
      onEndReached={onEndReached}
      ListFooterComponent={hasNextPage ? <AppViewLoading /> : null}
    />
  );
}

function TopNewsLatest() {
  const { Sizes } = useAppSize();
  const { list, hasNextPage, fetchNextPage, error, refetch, isRefetching } =
    useQueryNews();

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (error && !list?.length) {
    return <AppViewError onPress={refetch} title={error.message} />;
  }

  return (
    <FlashList
      refreshing={isRefetching}
      onRefresh={refetch}
      numColumns={Sizes.masonry_column}
      data={list}
      renderItem={({ item, index }) => (
        <TopNewsItem data={item} index={index} />
      )}
      onEndReached={onEndReached}
      ListFooterComponent={hasNextPage ? <AppViewLoading /> : null}
    />
  );
}

function TopNewsMost() {
  const { Sizes } = useAppSize();
  const { list, hasNextPage, fetchNextPage, error, refetch, isRefetching } =
    useQueryNewsMost();

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (error && !list?.length) {
    return <AppViewError onPress={refetch} title={error.message} />;
  }

  return (
    <FlashList
      refreshing={isRefetching}
      onRefresh={refetch}
      numColumns={Sizes.masonry_column}
      data={list}
      renderItem={({ item, index }) => (
        <TopNewsItem
          data={item.news}
          index={index}
          extra={{ viewCount: item.viewCount }}
        />
      )}
      onEndReached={onEndReached}
      ListFooterComponent={hasNextPage ? <AppViewLoading /> : null}
    />
  );
}

const renderScene = SceneMap({
  zero: TopNewsForYou,
  first: TopNewsLatest,
  second: TopNewsMost,
});

export function TopNews() {
  const { Sizes } = useAppSize();
  const { Strings } = useAppLanguage();
  const { Colors } = useAppTheme();

  const [index, setIndex] = useState(0);

  const routes = [
    { key: 'zero', title: Strings.For_you },
    { key: 'first', title: Strings.Latest_news },
    { key: 'second', title: Strings.Most_viewed_news },
  ];

  const renderTabBar = (props: TabBarProps<(typeof routes)[0]>) => (
    <TabBar
      {...props}
      style={{ backgroundColor: 'transparent', height: Sizes.tabbar }}
      activeColor={Colors.app.Primary}
      inactiveColor={Colors.app.Text_Secondary}
      indicatorStyle={{
        backgroundColor: Colors.app.Primary,
      }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Sizes.device_width }}
      renderTabBar={renderTabBar}
    />
  );
}
