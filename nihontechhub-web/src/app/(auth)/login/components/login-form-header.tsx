'use client';

// import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader } from '@/components/ui/card';
// import { useAppLanguage } from '@/modules/hooks/use-app-language';
// import { AppLanguage } from '@/modules/i18n';
import React from 'react';

export const LoginFormHeader = () => {
  // const { Strings, changeLanguage, languageCode } = useAppLanguage();

  return (
    <CardHeader className="text-center">
      {/* <CardTitle className="text-xl">{Strings.language}</CardTitle> */}
      <CardDescription>
        Login with your Apple or Google account{' '}
        {/* <Button
          variant="link"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            languageCode === AppLanguage.EN ? changeLanguage(AppLanguage.VI) : changeLanguage(AppLanguage.EN);
          }}
        >
          Change Language
        </Button> */}
      </CardDescription>
    </CardHeader>
  );
};
