import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

export const makeQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          // With SSR, we usually want to set some default staleTime
          // above 0 to avoid refetching immediately on the client
          staleTime: 60 * 1000,
        },
      },
    }),
);

export const dataQueryToList = (data: any = {}) => {
  const convertList: any = [];
  data?.pages?.forEach((element: any) => {
    if (!element?.data) {
      return;
    }
    if (Array.isArray(element.data)) {
      convertList.push(...element.data);
    } else {
      convertList.push(element.data);
    }
  });
  return [...new Set(convertList)];
};
