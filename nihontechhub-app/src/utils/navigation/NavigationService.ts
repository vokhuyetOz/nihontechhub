import {
  NavigationState,
  PartialState,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import type { RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function navigate(name: keyof RootStackParamList, params: any) {
  navigationRef.current?.navigate(name, params);
}
export function reset(config: PartialState<NavigationState>) {
  navigationRef.current?.reset(config);
}
export function push(name: keyof RootStackParamList, params?: object) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}
