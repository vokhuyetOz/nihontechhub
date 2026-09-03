import { useEffect, useState } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@utils/resource';

import { TSearchForm } from '../Search';
import { useRoute } from '@react-navigation/native';
import { TabStackScreenProps } from '@utils/navigation/types';
import { NewsAPI } from '@utils/modules/FetchApi/News/NewsAPI';
import { uniqueBy, useAppLanguage } from '@utils/modules';

export const useQuerySearch = () => {
  const { control } = useFormContext<TSearchForm>();
  const searchKey = useWatch({ control, name: 'searchKey', exact: true });
  const { params } = useRoute<TabStackScreenProps<'Search'>['route']>();
  const [key, setKey] = useState(params?.data ?? '');
  const { code } = useAppLanguage();

  useEffect(() => {
    const handle = () => {
      setKey(searchKey);
    };
    const timeout = setTimeout(handle, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchKey]);

  const query = useQuery({
    queryKey: [code, QueryKeys.SEARCH, key],
    queryFn: () => NewsAPI.search({ search: searchKey }),
    select: data => uniqueBy(data?.data ?? [], 'id'),
    enabled: !!key,
  });
  return query;
};
