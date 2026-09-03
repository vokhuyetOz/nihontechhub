import { HighlightAPI, THighlight } from '@/modules/api/highlight';
import { QUERY_KEYS } from '@/modules/queries';
import { dataQueryToList } from '@/modules/utils';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useQueryHighlight = () => {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEYS.HIGHLIGHT],
    queryFn: ({ pageParam }) => {
      return HighlightAPI.list({ page: pageParam });
    },
    getNextPageParam: (last) => {
      if (last.page < last.pageCount) {
        return last.page + 1;
      }
      return;
    },

    initialPageParam: 1,
  });
  const list = dataQueryToList(query.data) as THighlight[];
  return { ...query, list };
};
