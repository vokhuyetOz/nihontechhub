import { notify } from 'react-native-notificated';

import { useMutation } from '@tanstack/react-query';
import { useAppLanguage } from '@utils/modules';
import { AuthAPI } from '@utils/modules/FetchApi/Auth/AuthAPI';
import { TLoginWithGoogle } from '@utils/modules/FetchApi/Auth/AuthType';

export const useMutationLoginWithGoogle = () => {
  const { Strings } = useAppLanguage();
  return useMutation({
    mutationKey: [],
    mutationFn: async (variables: TLoginWithGoogle) => {
      console.log('variables', variables);
      return AuthAPI.loginWithGoogle({ ...variables });
    },
    onError(error) {
      console.log('error', error);
      notify('error', {
        params: {
          title: error?.message ?? Strings.Login_failed,
        },
      });
    },
    throwOnError: false,
  });
};
