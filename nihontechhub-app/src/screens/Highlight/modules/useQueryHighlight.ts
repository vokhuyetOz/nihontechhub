import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { Convert, useAppLanguage } from '@utils/modules';
import {
  HighlightAPI,
  THighlight,
} from '@utils/modules/FetchApi/Highlight/HighlightAPI';
import { QueryKeys } from '@utils/resource';

export const useQueryHighlight = () => {
  const { code } = useAppLanguage();
  const query = useInfiniteQuery({
    queryKey: [code, QueryKeys.HIGHLIGHT],
    queryFn: ({ pageParam }) =>
      HighlightAPI.list({ page: pageParam, limit: 10 }),
    getNextPageParam: last => {
      if (last.page < last.pageCount) {
        return last.page + 1;
      }
      return;
    },
    initialPageParam: 1,
    placeholderData: keepPreviousData,
  });

  const list = Convert.dataQueryToList<THighlight>(query.data);
  return { ...query, list };
};
