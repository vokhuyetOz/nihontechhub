import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import {
  Convert,
  getGroupDateString,
  parseDate,
  useAppLanguage,
} from '@utils/modules';
import { EventAPI, TEvent } from '@utils/modules/FetchApi/Event/EventAPI';

import { QueryKeys } from '@utils/resource';

const groupEventsByDate = (events: TEvent[]) => {
  const grouped = events.reduce((acc, event) => {
    const date = getGroupDateString(event.earliestPublished);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {} as Record<string, TEvent[]>);
  // Sort dates in descending order and sort events within each date by time
  return Object.entries(grouped)
    .sort(([a], [b]) => parseDate(b).getTime() - parseDate(a).getTime())
    .map(([date, events]) => ({
      date,
      events: events.sort(
        (a, b) =>
          parseDate(b.earliestPublished).getTime() -
          parseDate(a.earliestPublished).getTime(),
      ),
    }));
};

export const useQueryEvent = () => {
  const { code } = useAppLanguage();
  const query = useInfiniteQuery({
    queryKey: [code, QueryKeys.EVENT],
    queryFn: ({ pageParam }) => EventAPI.list({ page: pageParam, limit: 10 }),
    getNextPageParam: last => {
      if (last.page < last.pageCount) {
        return last.page + 1;
      }
      return;
    },
    initialPageParam: 1,
    placeholderData: keepPreviousData,
  });

  const list = Convert.dataQueryToList<TEvent>(query.data).map(item => {
    const getImpact = (): 'Low' | 'Medium' | 'High' | 'Critical' => {
      if (item.importance <= 0.1) {
        return 'Low';
      }
      if (item.importance <= 0.2) {
        return 'Medium';
      }
      if (item.importance <= 0.3) {
        return 'High';
      }
      return 'Critical';
    };
    return {
      ...item,
      impact: getImpact(),
    };
  });
  const groupedEvents = groupEventsByDate(list);
  return { ...query, list, groupedEvents };
};
