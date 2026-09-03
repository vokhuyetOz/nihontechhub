import { NewsAPI, TNews } from '@/modules/api/news/news-api';
import { QUERY_KEYS } from '@/modules/queries';
import { dataQueryToList } from '@/modules/utils';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useQueryNews = (category?: string) => {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEYS.POSTS, category],
    queryFn: ({ pageParam }) => {
      return NewsAPI.list({ page: pageParam, category });
    },
    getNextPageParam: (last) => {
      if (last.page < last.pageCount) {
        return last.page + 1;
      }
      return;
    },
    initialPageParam: 1,
  });
  const list = dataQueryToList(query.data) as TNews[];
  return { ...query, list };
};
