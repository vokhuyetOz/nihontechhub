import React from 'react';
import { render } from '@testing-library/react-native';
import { AppTextAnimated } from './AppTextAnimated';
describe('AppTextAnimated', () => {
  const animatedSharedValueMock = { value: 'Initial Value' };

  test('should update the value when the text prop changes', () => {
    const tree = render(<AppTextAnimated text={animatedSharedValueMock} />);
    const textInput = tree.getByTestId('progress-text');
    expect(tree).toMatchSnapshot();
    expect(textInput.props.value).toBe('Initial Value');
    // Update the text prop and trigger a re-render
    animatedSharedValueMock.value = 'New Value';
    tree.rerender(<AppTextAnimated text={animatedSharedValueMock} />);
    expect(textInput.props.value).toBe('New Value');
  });
  test('should render valueSuffix', () => {
    const valueSuffix = 'km/h';
    const tree = render(
      <AppTextAnimated
        text={animatedSharedValueMock}
        valueSuffix={valueSuffix}
      />,
    );
    expect(tree.getByText(valueSuffix)).toBeDefined();
  });
  test('should render valueSuffix', () => {
    const valuePrefix = '$';
    const tree = render(
      <AppTextAnimated
        text={animatedSharedValueMock}
        valueSuffix={valuePrefix}
      />,
    );
    expect(tree.getByText(valuePrefix)).toBeDefined();
  });
});
