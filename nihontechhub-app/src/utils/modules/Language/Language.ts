import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

import { CheckLogic, StringsEnglish, StringsJapanese } from '../../resource';

const tag = 'language-code';

const mmkvId = `mmkv-${tag}`;
const mmkvKey = `key-${tag}`;

const MMKVwithID = new MMKVLoader().withInstanceID(mmkvId).initialize();

type TypeLanguageKey = keyof typeof CheckLogic.Language_code;
type TypeLanguageCode = (typeof CheckLogic.Language_code)[TypeLanguageKey];
const LanguageService = {
  setCode: (code: TypeLanguageCode) => MMKVwithID.setString(mmkvKey, code),
  getCode: () => MMKVwithID.getString(mmkvKey) || CheckLogic.Language_code.ja,
  get: () => {
    const code = MMKVwithID.getString(mmkvKey);

    if (code === CheckLogic.Language_code.en) {
      return StringsEnglish;
    }

    return StringsJapanese;
  },
};
function useAppLanguage() {
  //value is languageCode
  //setValue is setLanguageCode
  const [languageCode, setValue] = useMMKVStorage<TypeLanguageCode>(
    mmkvKey,
    MMKVwithID,
    CheckLogic.Language_code.ja,
  );
  let language: typeof StringsJapanese = StringsJapanese;
  // | typeof StringsJapanese
  // | typeof StringsEnglish = StringsVietnamese;

  if (languageCode === CheckLogic.Language_code.en) {
    language = StringsEnglish;
  }
  // else if (languageCode === CheckLogic.Language_code.en) {
  //   language = StringsEnglish;
  // }

  return { Strings: language, setLanguageCode: setValue, code: languageCode };
}
export { LanguageService, useAppLanguage };
