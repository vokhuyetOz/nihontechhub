import { useAppLanguage } from '@/modules/hooks/use-app-language';
import Link from 'next/link';
import React from 'react';

export const LoginFormSignup = () => {
  const { Strings } = useAppLanguage();
  return (
    <div className="text-center text-sm">
      {Strings.dontHaveAccount}{' '}
      <Link href="#" className="underline underline-offset-4">
        {Strings?.signup}
      </Link>
    </div>
  );
};
