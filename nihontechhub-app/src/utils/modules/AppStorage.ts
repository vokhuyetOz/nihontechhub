import {
  MMKVInstance,
  MMKVLoader,
  useMMKVStorage,
} from 'react-native-mmkv-storage';

export const MMKVwithID: MMKVInstance = new MMKVLoader()
  .withInstanceID('default-mmkv-id')
  .initialize();

export function useStorage<T>(key: string, defaultValue?: T) {
  const [value, setValue] = useMMKVStorage<T>(key, MMKVwithID, defaultValue);
  return [value, setValue];
}
