import { useContext } from 'react';

import { SupportedLanguages } from '../i18n';
import { I18nContext } from '../i18n/i18n-context';
import JA from '../i18n/languages/ja';

export const useAppLanguage = () => {
  const { languageCode, changeLanguage } = useContext(I18nContext);
  return {
    Strings: SupportedLanguages[languageCode] ?? JA,
    languageCode,
    changeLanguage,
  } as const;
};
