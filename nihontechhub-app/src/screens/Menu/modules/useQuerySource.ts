import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@utils/resource';

import { CategoryAPI } from '@utils/modules/FetchApi/Category/CategoryAPI';

export const useQuerySource = () => {
  const query = useQuery({
    queryKey: [QueryKeys.SOURCE],
    queryFn: () => CategoryAPI.list(),
  });
  return query;
};
