import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputHTMLAttributes } from 'react';

interface IFormDatePickerProps {
  label?: string;
  name: string;
}

export const FormDatePicker = ({ label, name, ...props }: IFormDatePickerProps & InputHTMLAttributes<HTMLInputElement>) => {
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
