import { AppText } from '@elements/AppText';
import { useAppTheme } from '@utils/modules';
import { useAppSize } from '@utils/modules';
import { ComonStyle } from '@utils/resource';
import { TextStyle } from 'react-native';

type TAppBadge = Readonly<{
  children: React.ReactNode;
  style?: TextStyle;
}>;

export function AppBadge({ children, style }: TAppBadge) {
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();

  return (
    <AppText
      style={[
        ComonStyle.border(Colors.app.Shape_Border),
        ComonStyle.smaller,
        {
          textTransform: 'uppercase',
          paddingHorizontal: Sizes.padding.default,
          paddingVertical: Sizes.padding.tiny,
          marginLeft: Sizes.padding.small,
          marginBottom: Sizes.padding.small,
          borderRadius: Sizes.oval_radius,
        },
        style,
      ]}
    >
      {children}
    </AppText>
  );
}
