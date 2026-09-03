import { EventAPI, TEvent } from '@/modules/api/event/event-api';
import { QUERY_KEYS } from '@/modules/queries';
import { dataQueryToList } from '@/modules/utils';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useQueryEvent = () => {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEYS.EVENT],
    queryFn: ({ pageParam }) => {
      return EventAPI.list({ page: pageParam });
    },
    getNextPageParam: (last) => {
      if (last.page < last.pageCount) {
        return last.page + 1;
      }
      return;
    },

    initialPageParam: 1,
  });
  const list = (dataQueryToList(query.data) as TEvent[]).map((item) => {
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
  return { ...query, list };
};

export const useQueryEventAll = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.EVENT_ALL],
    queryFn: EventAPI.all,
    select: (data) => {
      return data?.map((item) => {
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
    },
  });

  return query;
};
