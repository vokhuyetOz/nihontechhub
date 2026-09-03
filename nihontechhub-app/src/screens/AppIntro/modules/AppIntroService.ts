import { MMKVwithID } from '@utils/modules';
import { CheckLogic } from '@utils/resource';

const { app_intro } = CheckLogic.Storage_key;

export const AppIntroService = {
  set: (hasShow: boolean) => {
    MMKVwithID.setBool(app_intro, hasShow);
  },
  get: () => {
    const hasShow = MMKVwithID.getBool(app_intro);
    return {
      hasShow,
    };
  },
};
