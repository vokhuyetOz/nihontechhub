import { NewsAPI, TNews } from '@/modules/api/news/news-api';
import { QUERY_KEYS } from '@/modules/queries';
import { dataQueryToList } from '@/modules/utils';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useQueryPostsByTag = (tag: string) => {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.TAG, tag],
    queryFn: ({ pageParam }) => NewsAPI.byTag({ tag, page: pageParam, limit: 10 }),
    initialPageParam: 1,
    getNextPageParam: (last) => {
      if (last.page < last.pageCount) {
        return last.page + 1;
      }
      return;
    },
  });

  const list = dataQueryToList(query.data) as TNews[];

  return { ...query, list };
};
