import JsCookies from 'js-cookie';

import { THEME_KEY } from '../constants';

export const getCurrentTheme = () => {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  let currentTheme = JsCookies.get(THEME_KEY) as 'light' | 'dark' | undefined;
  if (!currentTheme) {
    currentTheme = systemTheme;
    JsCookies.set(THEME_KEY, currentTheme);
  }
  return currentTheme;
};
