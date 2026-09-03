import { AppViewLoading } from '@elements/AppViewLoading';
import { FlashList } from '@shopify/flash-list';

import { useQueryEvent } from '../modules/useQueryEvent';

import { AppViewError } from '@elements/AppViewError';
import { EventHeader } from './EventHeader';
import { EventListGroup } from './EventListGroup';

export function EventList() {
  const { groupedEvents, hasNextPage, fetchNextPage, error, refetch } =
    useQueryEvent();

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (error && !groupedEvents?.length) {
    return <AppViewError onPress={refetch} title={error.message} />;
  }

  return (
    <FlashList
      data={groupedEvents}
      renderItem={({ item, index }) => (
        <EventListGroup data={item} index={index} />
      )}
      onEndReached={onEndReached}
      ListHeaderComponent={EventHeader}
      ListFooterComponent={hasNextPage ? <AppViewLoading /> : null}
    />
  );
}
