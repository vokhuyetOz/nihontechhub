import { NewsAPI } from '@/modules/api/news/news-api';
import { QUERY_KEYS } from '@/modules/queries';
import { useQuery } from '@tanstack/react-query';

export const useQueryFeatured = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.FEATURED_ARTICLE],
    queryFn: NewsAPI.featured,
  });

  return query;
};
