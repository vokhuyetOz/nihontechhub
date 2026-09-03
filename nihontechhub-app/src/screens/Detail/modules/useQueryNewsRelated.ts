import { useQuery } from '@tanstack/react-query';
import { useAppLanguage } from '@utils/modules';
import { NewsAPI } from '@utils/modules/FetchApi/News/NewsAPI';
import { QueryKeys } from '@utils/resource';

export const useQueryNewsRelated = (id: string, tags: string[]) => {
  const { code } = useAppLanguage();
  const query = useQuery({
    queryKey: [code, QueryKeys.FEED_RELATED, id],
    queryFn: () => NewsAPI.relate({ id, tags: tags }),
  });
  return query;
};
