import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react-native';
import '@testing-library/jest-dom';
import {AppViewError} from './AppViewError';

/**
 * Run test command
 * yarn test -u -t="AppViewError"
 */

afterAll(cleanup);

describe('AppViewError', () => {
  test('should render correctly', () => {
    const tree = render(
      <AppViewError title="AppViewError" titleStyle={{color: 'red'}} />,
    );

    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.getByText('AppViewError')).toBeDefined();
  });

  test('should invoke onPressMock if pressed', () => {
    const onPressMock = jest.fn();
    const tree = render(
      <AppViewError
        title="AppViewError"
        titleStyle={{color: 'red'}}
        onPress={onPressMock}
      />,
    );

    fireEvent.press(tree.getByText('AppViewError'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
