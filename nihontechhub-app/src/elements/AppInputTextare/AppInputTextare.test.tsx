import React from 'react';
import { useForm } from 'react-hook-form';

import { fireEvent, render } from '@testing-library/react-native';

import { AppInputTextarea } from './AppInputTextare';
import { create } from 'react-test-renderer';

/**
 * Run test command
 * yarn test -u -t="AppInputTextarea"
 */
describe('AppInputTextarea', () => {
  test('should render correctly', () => {
    const AppInputTextareaElement = () => {
      const methods = useForm();
      return (
        <AppInputTextarea
          {...methods}
          name="AppInputTextarea"
          label="AppInputTextarea"
        />
      );
    };
    const tree = render(<AppInputTextareaElement />);
    expect(tree).toMatchSnapshot();
    expect(tree.getByText('AppInputTextarea')).toBeDefined();
  });

  test('should render only input', () => {
    const RenderingElement = () => {
      const methods = useForm();
      return (
        <AppInputTextarea
          {...methods}
          name="AppInputTextarea"
          placeholder="something...!"
        />
      );
    };

    const tree = create(<RenderingElement />);
    expect(
      tree.root.findAllByProps({ children: 'AppInputTextarea' }).length,
    ).toEqual(0);
    expect(
      tree.root.findAllByProps({ placeholder: 'something...!' }),
    ).toBeDefined();
  });

  test('should update text on if change text and check max lenght', () => {
    const inputText = 'test change text';
    const maxLength = 10;
    const RenderingElement = () => {
      const { control } = useForm();
      return (
        <AppInputTextarea
          rules={{ maxLength }}
          name="AppInputTextarea"
          control={control}
          placeholder="placeholder"
        />
      );
    };
    const tree = render(<RenderingElement />);
    const input = tree.getByPlaceholderText('placeholder');
    fireEvent.changeText(input, inputText);
    expect(input.props.value).toBe(inputText);
    expect(input.props.value.length).toBeGreaterThan(maxLength);
  });
});
