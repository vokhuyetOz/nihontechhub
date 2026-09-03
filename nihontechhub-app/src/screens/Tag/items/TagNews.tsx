import { AppViewLoading } from '@elements/AppViewLoading';
import { FlashList } from '@shopify/flash-list';

import { AppViewError } from '@elements/AppViewError';
import { TopNewsItem } from '@screens/TopPage/items/TopNewsItem';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TabStackScreenProps } from '@utils/navigation/types';
import { useEffect } from 'react';
import { useQueryNewsByTag } from '../modules/useQueryNewsByTag';
import { useAppSize } from '@utils/modules';

export function TagNews() {
  const { params } = useRoute<TabStackScreenProps<'Tag'>['route']>();
  const navigation = useNavigation<TabStackScreenProps<'Tag'>['navigation']>();
  const { Sizes } = useAppSize();

  const { list, hasNextPage, fetchNextPage, error, refetch, isRefetching } =
    useQueryNewsByTag(params.data);
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
      data={list}
      numColumns={Sizes.masonry_column}
      renderItem={({ item, index }) => (
        <TopNewsItem data={item} index={index} />
      )}
      onEndReached={onEndReached}
      ListFooterComponent={hasNextPage ? <AppViewLoading /> : null}
    />
  );
}
