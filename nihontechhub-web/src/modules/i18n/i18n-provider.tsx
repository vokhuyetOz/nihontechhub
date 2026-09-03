'use client';

import { useState } from 'react';

import { AppLanguage } from '.';
import { TComponentChildrenProps } from '../types';
import { I18nContext } from './i18n-context';

export function I18nProvider({ children }: TComponentChildrenProps) {
  const [languageCode, setLanguageCode] = useState((process.env.NEXT_PUBLIC_LANG as AppLanguage) ?? AppLanguage.JA);
  return <I18nContext.Provider value={{ languageCode, changeLanguage: setLanguageCode }}>{children}</I18nContext.Provider>;
}
