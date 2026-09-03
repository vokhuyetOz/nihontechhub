'use server';

import { cookies } from 'next/headers';

import { THEME_KEY } from '../constants';

export const toggleThemeAction = async (theme: 'light' | 'dark') => {
  const cookiesStore = await cookies();
  cookiesStore.set(THEME_KEY, theme);
};
