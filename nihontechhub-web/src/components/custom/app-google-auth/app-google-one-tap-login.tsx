'use client';

import { useGoogleOneTapLogin } from '@react-oauth/google';

export function AppGoogleOneTapLogin() {
  useGoogleOneTapLogin({
    onSuccess: (credentials) => {
      console.log('xxx::credentials', credentials);
    },
    onError: () => {
      console.log('Login Failed');
    },
  });
  return <></>;
}
