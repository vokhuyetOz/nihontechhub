'use client';

import React from 'react';

export enum AppLanguage {
  EN = 'En',
  VI = 'Vi',
  JA = 'Ja',
}

interface I18nContextValue {
  languageCode: AppLanguage;
  changeLanguage: (languageCode: AppLanguage) => void;
}

export const I18nContext = React.createContext<I18nContextValue>({
  languageCode: AppLanguage.JA,
  changeLanguage: () => {},
});
