'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AuthAPI } from '../api/auth';
import { COOKIE_ACCESS_TOKEN_KEY } from '../constants';
import EN from '../i18n/languages/en';
import { JWTHelper } from '../utils';

export const loginAction = async (formData: FormData) => {
  let causeError: boolean = false;
  try {
    const cookiesStore = await cookies();
    const email = formData.get('email')! as string;
    const password = formData.get('password')! as string;
    const response = await AuthAPI.login({ email, password });
    cookiesStore.set(COOKIE_ACCESS_TOKEN_KEY, response.data.token);
  } catch (error) {
    causeError = !!error;
    return {
      message: EN.somethingWentWrong,
    };
  }
  if (!causeError) redirect('/');
};

export const logoutAction = async () => {
  // const cookiesStore = await cookies();
  // cookiesStore.delete(COOKIE_ACCESS_TOKEN_KEY);
  // redirect('/login');
};

export const refreshTokenAction = async () => {
  // TODO: handle refrfesh token
};

export const validateAccessTokenAction = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get(COOKIE_ACCESS_TOKEN_KEY)?.value;
  if (!token) return false;
  const verified = await JWTHelper.verify(token!);
  return verified;
};
