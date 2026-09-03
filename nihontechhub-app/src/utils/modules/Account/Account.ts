import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

import { TProfileInformation } from '../FetchApi/Auth/AuthType';

const tag = 'account';

const mmkvId = `mmkv-${tag}`;
const mmkvKey = `key-${tag}`;
const MMKVwithID = new MMKVLoader().withInstanceID(mmkvId).initialize();

type TAccount = {
  id: string;
  id_social_network: string;
  token: string;
  role: 'user' | 'admin';
  provider: 'google' | 'apple';
  refreshToken?: string;
  profile?: Partial<TProfileInformation> & {
    email?: string;
  };
};
type TUseAppAccount = {
  account?: TAccount;
  setValue: (data: TAccount) => void;
};
const AccountService = {
  get: () => MMKVwithID.getMap<TAccount>(mmkvKey),
  set: (value: Partial<TAccount> = {}) => {
    const pre = AccountService.get() ?? {};
    MMKVwithID.setMap(mmkvKey, { ...pre, ...value });
  },
  remove: () => {
    MMKVwithID.removeItem(mmkvKey);
  },
};

function useAppAccount(): TUseAppAccount {
  const [value, setValue] = useMMKVStorage<TAccount>(mmkvKey, MMKVwithID);

  return { account: value, setValue };
}
export { AccountService, useAppAccount };
