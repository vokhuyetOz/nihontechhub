import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { Convert, uniqueBy, useAppLanguage } from '@utils/modules';
import { NewsAPI, TNews } from '@utils/modules/FetchApi/News/NewsAPI';
import { QueryKeys } from '@utils/resource';

export const useQueryNewsByTag = (tag: string) => {
  const { code } = useAppLanguage();
  const query = useInfiniteQuery({
    queryKey: [code, QueryKeys.TAG, tag],
    queryFn: ({ pageParam }) =>
      NewsAPI.byTag({ page: pageParam, limit: 5, tag }),
    getNextPageParam: last => {
      if (last.page < last.pageCount) {
        return last.page + 1;
      }
      return;
    },
    initialPageParam: 1,
    placeholderData: keepPreviousData,
  });

  const list = Convert.dataQueryToList<TNews>(query.data);
  return { ...query, list: uniqueBy(list, 'id') };
};
