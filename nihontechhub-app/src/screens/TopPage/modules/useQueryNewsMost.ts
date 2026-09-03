import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { Convert, uniqueBy, useAppLanguage } from '@utils/modules';
import { NewsAPI, TNewsStatistics } from '@utils/modules/FetchApi/News/NewsAPI';
import { QueryKeys } from '@utils/resource';

export const useQueryNewsMost = (category?: string) => {
  const { code } = useAppLanguage();
  const query = useInfiniteQuery({
    queryKey: [code, QueryKeys.NEWS_MOST, category],
    queryFn: ({ pageParam }) =>
      NewsAPI.most({ page: pageParam, limit: 5, category }),
    getNextPageParam: last => {
      if (last.page < last.pageCount) {
        return last.page + 1;
      }
      return;
    },
    initialPageParam: 1,
    placeholderData: keepPreviousData,
  });

  const list = Convert.dataQueryToList<TNewsStatistics>(query.data);
  return { ...query, list: uniqueBy(list, 'id') };
};
