import { AppViewLoading } from '@elements/AppViewLoading';
import { FlashList } from '@shopify/flash-list';

import { AppViewError } from '@elements/AppViewError';
import { TopNewsItem } from '@screens/TopPage/items/TopNewsItem';
import { useQueryNews } from '@screens/TopPage/modules/useQueryNews';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TabStackScreenProps } from '@utils/navigation/types';
import { useEffect } from 'react';
import { useAppSize } from '@utils/modules';

export function CateNews() {
  const { params } = useRoute<TabStackScreenProps<'Cate'>['route']>();
  const navigation = useNavigation<TabStackScreenProps<'Cate'>['navigation']>();
  const { Sizes } = useAppSize();

  const { list, hasNextPage, fetchNextPage, error, refetch, isRefetching } =
    useQueryNews(params.data);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: params.data,
    });
  }, [params.data]);

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
