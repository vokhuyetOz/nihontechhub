'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/modules/utils/utils';

import { LoginFormEmailPassword } from './login-form-email-password';
import { LoginFormFooter } from './login-form-footer';
import { LoginFormHeader } from './login-form-header';
import { LoginFormSignup } from './login-form-signup';
import { LoginFormSocial } from './login-form-social';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <LoginFormHeader />
        <CardContent>
          <div className="grid gap-6">
            <LoginFormSocial />
            <LoginFormEmailPassword />
            <LoginFormSignup />
          </div>
        </CardContent>
      </Card>
      <LoginFormFooter />
    </div>
  );
}
