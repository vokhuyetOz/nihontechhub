import { useAppSize, useAppTheme } from '@utils/modules';
export type TButtonSize = 'small' | 'medium' | 'large';
export type TButtonVariant = 'solid' | 'outline' | 'text';

type ElementsStyle = {
  elSize?: TButtonSize;
  elVariant?: TButtonVariant | 'disable';
};
function useButtonStyle({
  elSize = 'medium',
  elVariant = 'solid',
}: ElementsStyle) {
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();

  const sizeStyle = {
    small: {
      paddingHorizontal: Sizes.wpx(12),
      paddingVertical: Sizes.wpx(11),
      fontSize: Sizes.wpx(14),
    },
    medium: {
      paddingHorizontal: Sizes.wpx(16),
      paddingVertical: Sizes.wpx(12),
      fontSize: Sizes.wpx(16),
    },
    large: {
      paddingHorizontal: Sizes.wpx(16),
      paddingVertical: Sizes.wpx(15),
      fontSize: Sizes.wpx(18),
    },
  }[elSize];

  const variantStyle = {
    solid: {
      backgroundColor: Colors.button.primary,
      textColor: Colors.button.sub_primary,
      borderColor: Colors.button.primary,
      borderWidth: 0,
      borderRadius: Sizes.border_radius,
    },
    outline: {
      backgroundColor: Colors.button.sub_primary,
      borderColor: Colors.button.primary,
      textColor: Colors.button.primary,
      borderWidth: Sizes.wpx(1),
      borderRadius: Sizes.border_radius,
    },
    text: {
      backgroundColor: Colors.button.sub_primary,
      borderColor: Colors.button.sub_primary,
      textColor: Colors.button.primary,
      borderWidth: 0,
    },
    disable: {
      backgroundColor: Colors.app.Shape_Disable,
      borderColor: Colors.button.primary,
      textColor: Colors.button.sub_primary,
      borderWidth: 0,
    },
  }[elVariant];
  return { sizeStyle, variantStyle };
}

export { useButtonStyle };
