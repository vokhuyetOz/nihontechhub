/* eslint-disable @typescript-eslint/ban-types */
import { useEffect, useRef } from 'react';

import { useForceUpdate } from '@vokhuyet/native-hooks';

const listeners = new Set<Function>();

let defaultAction: Function | undefined;

export function setActionRequireLogin(action?: Function) {
  defaultAction = action;
  listeners.forEach(listener => listener(action));
}

/**
 * return true if have an action require login
 * @returns
 */
export function useRequireLogin() {
  const forceUpdate = useForceUpdate();

  const actionRef = useRef<Function | undefined>(defaultAction);

  // Listen for updates
  useEffect(() => {
    const setAction = (newAction?: Function) => {
      actionRef.current = newAction;
      forceUpdate();
    };
    listeners.add(setAction);

    return () => {
      listeners.delete(setAction);
    };
  }, []);

  return actionRef.current;
}
