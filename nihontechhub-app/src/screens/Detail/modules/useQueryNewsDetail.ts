import { useEffect } from 'react';

import { useRoute } from '@react-navigation/native';
import { ForYouService } from '@screens/TopPage/modules/useForYouTags';
import { useQuery } from '@tanstack/react-query';
import { NewsAPI } from '@utils/modules/FetchApi/News/NewsAPI';
import { TabStackScreenProps } from '@utils/navigation/types';
import { QueryKeys } from '@utils/resource';
import { useAppLanguage } from '@utils/modules';

export const useQueryNewsDetail = () => {
  const { params } = useRoute<TabStackScreenProps<'NewsDetail'>['route']>();
  const { code } = useAppLanguage();
  const query = useQuery({
    queryKey: [code, QueryKeys.NEWS, params.data.id],
    queryFn: () => NewsAPI.detail({ id: params.data.id }),
    initialData: params.data,
  });

  useEffect(() => {
    if (!params?.data?.id) {
      return;
    }

    if (query.data?.tags?.length) {
      ForYouService.set(query.data.tags);
    }

    NewsAPI.read({ id: params.data.id });
  }, [params?.data?.id]);

  return query;
};
