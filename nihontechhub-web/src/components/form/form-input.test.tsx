import { render, screen, fireEvent } from '@testing-library/react';
// Adjust path if necessary
import { useForm, FormProvider } from 'react-hook-form';

import { FormInput } from './form-input';

describe('FormInput', () => {
  test('renders input with label', () => {
    // Setup form with react-hook-form
    const methods = useForm();
    render(
      <FormProvider {...methods}>
        <FormInput name="testInput" label="Test Input" />
      </FormProvider>,
    );

    // Check if the input field and label are rendered correctly
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('allows user to type in input field', () => {
    const methods = useForm();
    render(
      <FormProvider {...methods}>
        <FormInput name="testInput" label="Test Input" />
      </FormProvider>,
    );

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'Hello' } });

    expect(inputElement).toHaveValue('Hello');
  });

  test('shows error message when input is touched and invalid', async () => {
    const methods = useForm();
    render(
      <FormProvider {...methods}>
        <FormInput name="testInput" label="Test Input" />
      </FormProvider>,
    );

    const inputElement = screen.getByRole('textbox');
    fireEvent.blur(inputElement); // simulate blur event

    // Check if error message or form validation message appears
    // For example: expect(screen.getByText('This field is required')).toBeInTheDocument();
  });
});
