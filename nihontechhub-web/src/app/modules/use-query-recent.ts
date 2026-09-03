import { NewsAPI } from '@/modules/api/news/news-api';
import { QUERY_KEYS } from '@/modules/queries';
import { useQuery } from '@tanstack/react-query';

export const useQueryRecent = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.RECENT],
    queryFn: NewsAPI.recent,
  });

  return query;
};
