import { useEffect } from 'react';

import crashlytics from '@react-native-firebase/crashlytics';
import { useQuery } from '@tanstack/react-query';
import { AccountService, useAppAccount } from '@utils/modules';
import { AuthAPI } from '@utils/modules/FetchApi/Auth/AuthAPI';
import { QueryKeys } from '@utils/resource';

export const useQueryProfile = () => {
  const { account } = useAppAccount();

  const { data } = useQuery({
    queryKey: [QueryKeys.PROFILE, account?.id],
    queryFn: AuthAPI.profile,
    select: result => result.data,
    enabled: !!account?.id,
  });
  useEffect(() => {
    if (data?.profile) {
      if (account?.id) {
        crashlytics().setUserId(account?.id);
      }

      AccountService.set({
        provider: data.provider,
        profile: {
          name: data.profile.name,
          avatar: data.profile.avatar,
          email: data.email,
          description: data.profile.description,
        },
      });
    }
  }, [data]);
};
