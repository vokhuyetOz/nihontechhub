import { isTablet } from 'react-native-device-info';

import { SPHighlightListItem } from './HighlightListItem.sp';
import { TBHighlightListItem } from './HighlightListItem.tb';
import { THighlight } from '@utils/modules/FetchApi/Highlight/HighlightAPI';

export function HighlightListItem(
  props: Readonly<{ data: THighlight; index: number }>,
) {
  const tablet = isTablet();

  if (tablet) {
    return <TBHighlightListItem {...props} />;
  }
  return <SPHighlightListItem {...props} />;
}
