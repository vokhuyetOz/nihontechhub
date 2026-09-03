import { NewsAPI } from '@/modules/api/news/news-api';
import { QUERY_KEYS } from '@/modules/queries';
import { useQuery } from '@tanstack/react-query';

export const useQueryRelate = (tags: string[], id: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.RELATE, ...tags],
    queryFn: () => NewsAPI.relate({ tags, id }),
  });

  return query;
};
