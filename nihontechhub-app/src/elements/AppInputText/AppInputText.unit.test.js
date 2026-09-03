import React from 'react';
import {useForm} from 'react-hook-form';
import {render, cleanup, fireEvent} from '@testing-library/react-native';
import {create} from 'react-test-renderer';
import {AppInputText} from './AppInputText';

/**
 * Run test command
 * yarn test -u -t="AppInputText"
 */
// control,
//   name,
//   label,
//   defaultValue = '',
//   rules,
//   secureTextEntry,
//   inputStyle,
//   containerStyle,
//   style,
//   elSize,
//   elVariant,
//   placeholder,
//   renderRight,
//   ...textInputProps

afterEach(cleanup);

describe('AppInputText', () => {
  test('should render both label and icon', () => {
    const RenderingElement = () => {
      const methods = useForm();
      return (
        <AppInputText
          {...methods}
          defaultValue="defaultValue"
          name="AppInputText"
          label="AppInputText"
          placeholder="placeholder"
          style={{
            backgroundColor: 'white',
          }}
          secureTextEntry
        />
      );
    };

    const tree = render(<RenderingElement />);
    expect(tree).toMatchSnapshot();
    expect(tree.getByText('AppInputText')).toBeDefined();
    expect(tree.getByPlaceholderText('placeholder').props.value).toBe(
      'defaultValue',
    );
    expect(tree.getByText('')).toBeDefined();
  });
  /**
   *
   */
  test('should render only input', () => {
    const RenderingElement = () => {
      const methods = useForm();
      return (
        <AppInputText
          {...methods}
          name="AppInputText"
          placeholder="placeholder"
        />
      );
    };

    const tree = create(<RenderingElement />);
    expect(tree.root.findAllByProps({children: 'AppInputText'}).length).toEqual(
      0,
    );
    expect(tree.root.findAllByProps({children: ''}).length).toEqual(0);
    expect(
      tree.root.findAllByProps({placeholder: 'placeholder'}),
    ).toBeDefined();
  });
  /**
   *
   */
  test('should update text on if change text', () => {
    const RenderingElement = () => {
      const {control} = useForm();
      return (
        <AppInputText
          name="AppInputText"
          control={control}
          placeholder="placeholder"
        />
      );
    };

    const tree = render(<RenderingElement />);
    const input = tree.getByPlaceholderText('placeholder');
    fireEvent.changeText(input, 'test change text');
    expect(input.props.value).toBe('test change text');
  });
  /**
   *
   */
});
