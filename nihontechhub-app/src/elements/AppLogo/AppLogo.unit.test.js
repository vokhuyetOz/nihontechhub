import { cleanup, render } from '@testing-library/react-native';
import { Sizes } from '@utils/modules';
import React from 'react';
import { AppLogo } from './AppLogo';

/**
 * Run test command
 * yarn test -u -t="AppLogo"
 */

afterAll(cleanup);

describe('AppLogo', () => {
  test('should render correctly', () => {
    const tree = render(
      <AppLogo style={{ margin: Sizes.padding.default }} size="small" />,
    );
    expect(tree).toMatchSnapshot();
  });
});
