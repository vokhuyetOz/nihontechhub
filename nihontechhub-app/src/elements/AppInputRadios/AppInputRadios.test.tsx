import React from 'react';
import { useForm } from 'react-hook-form';

import {
  render,
  screen,
  fireEvent,
  cleanup,
} from '@testing-library/react-native';

import { AppInputRadios } from './AppInputRadios';
import { create } from 'react-test-renderer';

const fadeData = [
  { id: 1, label: 'item 1' },
  { id: 2, label: 'item 2' },
  { id: 3, label: 'item 3' },
  { id: 4, label: 'item 4' },
];
/**
 * Run test command
 * yarn test -u -t="AppInputRadios"
 */

afterEach(cleanup);

describe('AppInputRadios', () => {
  test('should render correctly', () => {
    const RenderingElement = () => {
      const method = useForm();
      return (
        <AppInputRadios
          {...method}
          defaultValue={2}
          name="AppInputRadios"
          label="AppInputRadios"
          data={fadeData}
        />
      );
    };
    const tree = render(<RenderingElement />);
    expect(tree).toMatchSnapshot();
  });
  test('should return the correct number of items passed in the array', () => {
    const RenderingElement = () => {
      const method = useForm();
      return (
        <AppInputRadios
          {...method}
          name="AppInputRadios"
          label="AppInputRadios"
          data={fadeData}
        />
      );
    };
    const tree = create(<RenderingElement />);
    const radiosEl = tree.root.findByProps({ testID: 'myRadios' }).props;
    expect(radiosEl.data.length).toBe(fadeData.length);
  });
  describe('check event onPree', () => {
    for (let node = 0; node < fadeData.length; node++) {
      test(`should checked item ${node}`, () => {
        const onPressMock = jest.fn();
        const RenderingElement = () => {
          const method = useForm();
          return (
            <AppInputRadios
              {...method}
              data={fadeData}
              name="AppInputRadios"
              label="AppInputRadios"
              onValueChange={onPressMock}
            />
          );
        };
        render(<RenderingElement />);
        fireEvent.press(screen.getByText(`${fadeData[node].label}`));
        expect(onPressMock).toHaveBeenCalled();
      });
    }
  });
  describe('check render label', () => {
    for (let node = 0; node < fadeData.length; node++) {
      test(`should render lable item ${node}`, () => {
        const RenderingElement = () => {
          const method = useForm();
          return (
            <AppInputRadios
              {...method}
              data={fadeData}
              name="AppInputRadios"
              label="AppInputRadios"
            />
          );
        };
        const tree = render(<RenderingElement />);
        expect(tree.getByText(`${fadeData[node].label}`)).toBeDefined();
      });
    }
  });
});
