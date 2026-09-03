import { useQuery } from '@tanstack/react-query';
import { AppVersionAPI } from '@utils/modules/FetchApi/AppVersion/AppVersionAPI';
import { QueryKeys } from '@utils/resource';

export const useQueryCheckAppVersion = () => {
  const value = useQuery({
    queryKey: [QueryKeys.CHECK_APP_VERSION],
    queryFn: AppVersionAPI.checkAppVersion,
  });
  return value;
};
