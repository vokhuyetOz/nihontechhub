import { isTablet } from 'react-native-device-info';

import { SPTopNewsItem } from './TopNewsItem.sp';
import { TBTopNewsItem } from './TopNewsItem.tb';
import { TNews } from '@utils/modules/FetchApi/News/NewsAPI';

export function TopNewsItem(
  props: Readonly<{
    data: TNews;
    index: number;
    extra?: { viewCount?: number };
  }>,
) {
  const tablet = isTablet();

  if (tablet) {
    return <TBTopNewsItem {...props} />;
  }
  return <SPTopNewsItem {...props} />;
}
