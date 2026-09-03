import { isTablet } from 'react-native-device-info';

import { TBTopNewsItem } from './TopNewsItem.tb';
import { TNews } from '@utils/modules/FetchApi/News/NewsAPI';
import { SPTopNewsForYouItem } from './TopNewsForyouItem.sp';

export function TopNewsForYouItem(
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
  return <SPTopNewsForYouItem {...props} />;
}
