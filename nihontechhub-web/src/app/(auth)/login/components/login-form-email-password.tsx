'use client';

import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { loginAction } from '@/modules/actions';
import { useAppLanguage } from '@/modules/hooks/use-app-language';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

export const LoginFormEmailPassword = () => {
  const { Strings } = useAppLanguage();

  const schema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6),
  });

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (value: z.infer<typeof schema>) => {
    const formData = new FormData();
    formData.set('email', value.email);
    formData.set('password', value.password);
    const response = await loginAction(formData);
    if (response?.message) {
      toast.error('Somthing went wrong!', {
        description: response?.message,
      });
    }
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    if (form.formState.isSubmitting) return;
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmitForm}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <FormInput label="Email" name="email" />
          </div>
          <div className="grid gap-2">
            <FormInput type="password" label="Password" name="password" />
          </div>
          <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
            {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
            {Strings.login}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
