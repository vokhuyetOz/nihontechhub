import type { ColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { ModeService } from '@utils/modules';

import { Sizes } from './sizes';

type TypeComonStyle = {
  center: StyleProp<ViewStyle>;
  shadow: () => StyleProp<ViewStyle>;
  bold: StyleProp<TextStyle>;
  borderBottom: (color: ColorValue) => StyleProp<ViewStyle>;
  border: (color: ColorValue) => ViewStyle;
  heading2: StyleProp<TextStyle>;
  heading1: StyleProp<TextStyle>;
  large: StyleProp<TextStyle>;
  larger: StyleProp<TextStyle>;
  normal: StyleProp<TextStyle>;
  smaller: StyleProp<TextStyle>;
  small: StyleProp<TextStyle>;
  tiny: StyleProp<TextStyle>;
  little: StyleProp<TextStyle>;
};

const ComonStyle: TypeComonStyle = {
  shadow: () => {
    const Colors = ModeService.getColors();

    return {
      shadowOffset: { width: 2, height: 2 },
      shadowColor: Colors.app.Shape_Border,
      shadowOpacity: 0.4,
      shadowRadius: 6,
      elevation: 16,
      backgroundColor: Colors.app.Background_Base,
    };
  },
  bold: {
    fontWeight: '700',
  },
  borderBottom: (color: ColorValue) => ({
    borderColor: color,
    borderBottomWidth: Sizes.border,
  }),
  border: (color: ColorValue) => ({
    borderColor: color,
    borderWidth: Sizes.border,
  }),
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading2: {
    fontSize: Sizes.heading2,
    lineHeight: Sizes.heading2 * 1.2,
  },
  heading1: {
    fontSize: Sizes.heading1,
    lineHeight: Sizes.heading1 * 1.2,
  },
  large: {
    fontSize: Sizes.large,
    lineHeight: Sizes.large * 1.4,
  },
  larger: {
    fontSize: Sizes.larger,
    lineHeight: Sizes.larger * 1.5,
  },
  normal: {
    fontSize: Sizes.normal,
    lineHeight: Sizes.normal * 1.5,
  },
  smaller: {
    fontSize: Sizes.smaller,
    lineHeight: Sizes.smaller * 1.6,
  },
  small: {
    fontSize: Sizes.small,
    lineHeight: Sizes.small * 1.6,
  },
  tiny: {
    fontSize: Sizes.tiny,
    lineHeight: Sizes.tiny * 1.6,
  },
  little: {
    fontSize: Sizes.little,
    lineHeight: Sizes.little * 1.2,
  },
};
export { ComonStyle };
