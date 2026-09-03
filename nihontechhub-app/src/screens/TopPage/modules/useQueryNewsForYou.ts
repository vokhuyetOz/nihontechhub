import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { Convert, uniqueBy, useAppLanguage } from '@utils/modules';
import { NewsAPI, TNews } from '@utils/modules/FetchApi/News/NewsAPI';
import { QueryKeys } from '@utils/resource';
import { useForYouTags } from './useForYouTags';

export const useQueryNewsForYou = () => {
  const { code } = useAppLanguage();
  const tags = useForYouTags();
  const query = useInfiniteQuery({
    queryKey: [code, QueryKeys.FOR_YOU, ...tags],
    queryFn: ({ pageParam }) =>
      NewsAPI.foryou({ page: pageParam, limit: 3, tag: tags }),
    getNextPageParam: last => {
      if (last.page < last.pageCount) {
        return last.page + 1;
      }
      return;
    },
    initialPageParam: 1,
    placeholderData: keepPreviousData,
  });
  console.log('useQueryNewsForYou', query.data);

  const list = Convert.dataQueryToList<TNews>(query.data);
  return { ...query, list: uniqueBy(list, 'id') };
};
