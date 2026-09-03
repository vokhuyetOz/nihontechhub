import { uniqueBy } from '@utils/modules';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

const tag = 'for-you-tags';

const mmkvId = `mmkv-${tag}`;
const mmkvKey = `key-${tag}`;

const MMKVwithID = new MMKVLoader().withInstanceID(mmkvId).initialize();

export const ForYouService = {
  set: (tags: string[]) => {
    const current = ForYouService.get();
    const newTags = uniqueBy([...tags, ...current]);
    MMKVwithID.setArray(mmkvKey, newTags.slice(0, 5));
  },
  get: () => {
    return MMKVwithID.getArray(mmkvKey) ?? ['AI', 'GOOGLE', 'IOS'];
  },
};

export const useForYouTags = () => {
  const [tags] = useMMKVStorage<string[]>(mmkvKey, MMKVwithID, [
    'AI',
    'GOOGLE',
    'IOS',
  ]);
  return tags;
};
