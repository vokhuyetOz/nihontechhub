import { MMKVLoader } from 'react-native-mmkv-storage';

import { experimental_createQueryPersister } from '@tanstack/query-persist-client-core';
// import { QueryKeys } from '@utils/resource';

const MMKVwithID = new MMKVLoader()
  .withInstanceID('QueryPersisterStorage')
  .initialize();

const QueryPersisterStorage = {
  getItem: (key: string) => MMKVwithID.getString(key),
  setItem: (key: string, value: string) => MMKVwithID.setString(key, value),
  removeItem: (key: string) => MMKVwithID.removeItem(key) as any,
};

export const persister = experimental_createQueryPersister({
  storage: QueryPersisterStorage,
  maxAge: 1000 * 60 * 60 * 24 * 20, // 20 days
  filters: {
    predicate: () => {
      return true;
    },
  },
});
