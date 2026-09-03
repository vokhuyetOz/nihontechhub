import React from 'react';
import { ColorValue } from 'react-native';
import { NumberProp } from 'react-native-svg';

import { Female, Male } from './Male';

type TypeFigmaIcons = {
  [key: string]: (props: {
    size?: NumberProp;
    color?: ColorValue;
  }) => JSX.Element;
};
export const FigmaIcons: TypeFigmaIcons = {
  male: Male,
  female: Female,
};

type Props = Readonly<{
  name: keyof typeof FigmaIcons;
  size?: NumberProp;
  color?: ColorValue;
}>;

export function Figma({ name, size, color }: Props) {
  const Component = FigmaIcons[name];

  return <Component size={size} color={color} />;
}
