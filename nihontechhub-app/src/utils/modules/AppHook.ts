import {
  createRef,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useFormContext } from 'react-hook-form';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  PixelRatio,
} from 'react-native';
import { Platform } from 'react-native';

import { useHeaderHeight as useHeaderHeightElements } from '@react-navigation/elements';
import { useFocusEffect } from '@react-navigation/native';
import { QueryObserver, useQueryClient } from '@tanstack/react-query';

export function useRefreshOnScreenFocus<T>(refetch: () => Promise<T>) {
  const firstTimeRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch();
    }, [refetch]),
  );
}
export const useQueryObserver = <T>(queryKey: string[]) => {
  const queryClient = useQueryClient();

  const [queryData, setQueryData] = useState<T | undefined>(
    queryClient.getQueryData<T>(queryKey),
  );

  useEffect(() => {
    const observer = new QueryObserver<T>(queryClient, {
      queryKey,
      notifyOnChangeProps: 'all',
      enabled: false,
    });
    const unsubscribe = observer.subscribe(result => {
      setQueryData(result.data);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return queryData;
};

const refs: Record<string, RefObject<any>> = {};
/**
 *
 * @param key use component to unique name
 * @returns
 */
export const useScrollRef = (key: string) => {
  const { setValue } = useFormContext();

  if (!refs[key]) {
    refs[key] = createRef();
  }
  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = nativeEvent;

    const scrollY = contentOffset.y; // current scroll position
    const visibleHeight = layoutMeasurement.height;
    const contentHeight = contentSize.height;

    // Detect top
    if (scrollY <= 30) {
      setValue('scrollPosition', 'top');
      return;
    }

    const bottomThreshold = 30;
    if (scrollY + visibleHeight >= contentHeight - bottomThreshold) {
      setValue('scrollPosition', 'bottom');
      return;
    }

    // Otherwise, we're somewhere in the middle
    setValue('scrollPosition', 'center');
  };

  const scrollToTop = () => {
    const ref = refs[key];
    ref?.current?.scrollTo({
      y: 0,
      x: 0,
      animated: true,
    });
    ref?.current?.scrollToTop?.({ animated: true });
  };
  return { ref: refs[key], onScroll, scrollToTop };
};

export function useHeaderHeight(): number {
  const headerHeight = useHeaderHeightElements();
  const fixedHeight = useRef(
    headerHeight > 200 ? headerHeight / PixelRatio.get() : headerHeight,
  );

  return Platform.OS === 'android' ? fixedHeight.current : headerHeight;
}
