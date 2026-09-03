import { AppLanguage } from './i18n-context';
// import EN from './languages/en';
import JA from './languages/ja';

// import VI from './languages/vi';

export * from './i18n-context';
export * from './i18n-provider';

export const SupportedLanguages = {
  // [AppLanguage.EN?.toString()]: EN,
  // [AppLanguage.VI?.toString()]: VI,
  [AppLanguage.JA?.toString()]: JA,
} as const;

export const getSupportedLanguage = (language: AppLanguage = (process.env.NEXT_PUBLIC_LANG as AppLanguage) ?? AppLanguage.JA) => {
  return SupportedLanguages[language] ?? JA;
};

export function getI18nPath<T>(key: string, code: string) {
  return `${key?.toString()}_${code}` as keyof T;
}
