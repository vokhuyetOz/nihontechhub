import React from 'react';
import { useForm } from 'react-hook-form';

import { render, cleanup } from '@testing-library/react-native';

import { AppSwitch } from './AppSwitch';

/**
 * Run test command
 * yarn test -u -t="AppSwitch"
 */

afterEach(cleanup);

const dataTest = [
  {
    label: 'aaaaa',
    name: 'aaaaa',
    disabled: false,
    activeTrackColor: 'red',
    inActiveTrackColor: 'black',
    thumbColor: 'pink',
    lableColor: 'green',
  },
  {
    label: 'ccccc',
    name: 'ccccc',
    disabled: true,
    activeTrackColor: 'red',
    inActiveTrackColor: 'black',
    thumbColor: 'pink',
    lableColor: 'green',
  },
];

describe('AppSwitch', () => {
  test('should render correctly', () => {
    const AppSwitchElement = () => {
      const methods = useForm();
      return (
        <AppSwitch
          {...methods}
          name="AppInputText"
          label="AppInputText"
          data={dataTest}
        />
      );
    };
    const tree = render(<AppSwitchElement />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should return the correct number of items passed in the array', () => {
    const AppSwitchElement = () => {
      const methods = useForm();
      return (
        <AppSwitch
          {...methods}
          name="AppInputText"
          label="AppInputText"
          data={dataTest}
        />
      );
    };
    const tree = render(<AppSwitchElement />).toJSON();
    expect(tree?.children).toHaveLength(dataTest.length);
  });
  test('renders enabled AppSwitch correctly', () => {
    const AppSwitchElement = () => {
      const methods = useForm();
      return (
        <AppSwitch
          {...methods}
          name="AppInputText"
          label="AppInputText"
          data={dataTest}
        />
      );
    };
    const tree = render(<AppSwitchElement />);
    expect(tree.toJSON()).toMatchSnapshot();
    const option1Label = tree.getByText('aaaaa');
    const option1Switch = tree.getByTestId('switch0');
    expect(option1Label.props.style[1][0].color).toBe('green'); // Màu của label khi enabled
    expect(option1Switch.props.disabled).toBe(false);
  });
  test('renders disabled AppSwitch correctly', () => {
    const AppSwitchElement = () => {
      const methods = useForm();
      return (
        <AppSwitch
          {...methods}
          name="AppInputText"
          label="AppInputText"
          data={dataTest}
        />
      );
    };
    const { getByTestId, getByText } = render(<AppSwitchElement />);
    const option1Label = getByText('ccccc');
    const option1Switch = getByTestId('switch1');

    expect(option1Label.props.style[1][0].color).toBe('#A3A3A3'); // Màu của label khi bị disable
    expect(option1Switch.props.disabled).toBe(true);
  });
  describe('should render label correctly', () => {
    for (let node = 0; node < dataTest.length; node++) {
      test(`should render label ${dataTest[node].label}`, () => {
        const AppSwitchElement = () => {
          const methods = useForm();
          return (
            <AppSwitch
              {...methods}
              name="AppInputText"
              label="AppInputText"
              data={dataTest}
            />
          );
        };
        const tree = render(<AppSwitchElement />);
        expect(tree.getByText(`${dataTest[node].label}`)).toBeDefined();
      });
    }
  });
});
