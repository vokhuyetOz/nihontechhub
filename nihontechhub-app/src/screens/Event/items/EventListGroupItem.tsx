import { isTablet } from 'react-native-device-info';

import { SPEventListGroupItem } from './EventListGroupItem.sp';
import { TBEventListGroupItem } from './EventListGroupItem.tb';
import { TEvent } from '@utils/modules/FetchApi/Event/EventAPI';

export function EventListGroupItem(
  props: Readonly<{ data: TEvent; index: number }>,
) {
  const tablet = isTablet();

  if (tablet) {
    return <TBEventListGroupItem {...props} />;
  }
  return <SPEventListGroupItem {...props} />;
}
