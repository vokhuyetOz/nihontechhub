import { notify } from 'react-native-notificated';

import { useMutation } from '@tanstack/react-query';
import { useAppLanguage } from '@utils/modules';
import { AuthAPI } from '@utils/modules/FetchApi/Auth/AuthAPI';

export const useMutationLoginWithApple = () => {
  const { Strings } = useAppLanguage();
  return useMutation({
    mutationKey: [],
    mutationFn: AuthAPI.loginWithApple,
    onError(error) {
      notify('error', {
        params: {
          title: error?.message ?? Strings.Login_failed,
        },
      });
    },
    throwOnError: false,
  });
};
