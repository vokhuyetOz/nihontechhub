import { AppViewLoading } from '@elements/AppViewLoading';
import { FlashList } from '@shopify/flash-list';

import { useQueryHighlight } from '../modules/useQueryHighlight';

import { AppViewError } from '@elements/AppViewError';
import { HighlightListItem } from './HighlightListItem';
import { HighlightHeader } from './HighlightHeader';

export function HighlightList() {
  const { list, hasNextPage, fetchNextPage, error, refetch } =
    useQueryHighlight();

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
      data={list}
      renderItem={({ item, index }) => (
        <HighlightListItem data={item} index={index} />
      )}
      onEndReached={onEndReached}
      ListHeaderComponent={HighlightHeader}
      ListFooterComponent={hasNextPage ? <AppViewLoading /> : null}
    />
  );
}
