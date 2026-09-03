import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputHTMLAttributes } from 'react';

interface IFormRadioButtonGroupProps {
  label?: string;
  name: string;
}

export const FormRadioButtonGroup = ({ label, name, ...props }: IFormRadioButtonGroupProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <FormField
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input {...props} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
