import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react-native';
import '@testing-library/jest-dom';
import {AppViewDataNull} from './AppViewDataNull';

/**
 * Run test command
 * yarn test -u -t="AppViewDataNull"
 */

afterAll(cleanup);

describe('AppViewDataNull', () => {
  test('should render correctly', () => {
    const tree = render(
      <AppViewDataNull
        title="AppViewDataNull"
        titleStyle={{color: 'red'}}
        style={{backgroundColor: 'blue'}}
      />,
    );
    expect(tree).toMatchSnapshot();
    expect(tree.getByText('AppViewDataNull')).toBeDefined();
  });
  test('should invoke onPressMock if pressed', () => {
    const onPressMock = jest.fn();
    const tree = render(
      <AppViewDataNull
        title="AppViewDataNull"
        titleStyle={{color: 'red'}}
        style={{backgroundColor: 'blue'}}
        onPress={onPressMock}
      />,
    );
    expect(tree).toMatchSnapshot();
    fireEvent.press(tree.getByText('AppViewDataNull'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
