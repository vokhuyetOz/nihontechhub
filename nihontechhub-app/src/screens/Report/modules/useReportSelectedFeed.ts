/* eslint-disable @typescript-eslint/ban-types */
import { useEffect, useState } from 'react';

import { TFeed } from '@utils/modules/FetchApi/Feed/FeedType';

const listeners = new Set<Function>();

let defaultItem: TFeed | undefined;

export function setReportSelectedFeed(action?: TFeed) {
  defaultItem = action;
  listeners.forEach(listener => listener(action));
}

/**
 * return selected item to show comment sheet
 * @returns
 */
export function useReportSelectedFeed() {
  const [item, setItem] = useState(defaultItem);

  // Listen for updates
  useEffect(() => {
    listeners.add(setItem);

    return () => {
      listeners.delete(setItem);
    };
  }, []);

  return item;
}
