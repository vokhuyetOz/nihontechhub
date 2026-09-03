import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react-native';
import {AppText} from './AppText';

/**
 * Run test command
 * yarn test -u -t="AppText"
 */

afterAll(cleanup);

describe('AppText', () => {
  test('should render correctly', () => {
    const tree = render(
      <AppText style={{color: 'black'}}>should render correctly</AppText>,
    );

    expect(tree).toMatchSnapshot();
  });

  test('should invoke onPressMock if pressed', () => {
    const onPressMock = jest.fn();

    const {getByText} = render(
      <AppText style={{color: 'black'}} onPress={onPressMock}>
        onPress
      </AppText>,
    );

    const textElement = getByText('onPress');
    fireEvent.press(textElement);
    expect(onPressMock).toHaveBeenCalled();
  });
});
