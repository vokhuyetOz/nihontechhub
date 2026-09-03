import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import Link from 'next/link';
import { InputHTMLAttributes } from 'react';

import { Checkbox } from '../ui/checkbox';

interface IFormCheckboxProps {
  label?: string;
  name: string;
}

export const FormCheckbox = ({ label, name }: IFormCheckboxProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <FormField
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Use different settings for my mobile devices {label}</FormLabel>
              <FormDescription>
                You can manage your mobile notifications in the <Link href="/examples/forms">mobile settings</Link> page.
              </FormDescription>
            </div>
          </FormItem>
        );
      }}
    />
  );
};
