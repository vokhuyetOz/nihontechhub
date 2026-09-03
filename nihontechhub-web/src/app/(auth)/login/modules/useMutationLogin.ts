import { AuthAPI } from '@/modules/api/auth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useMutationLogin = () => {
  return useMutation({
    mutationKey: [],
    mutationFn: async (variables: any) => {
      return AuthAPI.login({ ...variables });
    },
    onError(error: AxiosError) {
      toast.error('Somthing went wrong!', {
        description: JSON.stringify(error?.response?.data),
      });
    },
    throwOnError: false,
  });
};
