import { useAppTheme } from '@utils/modules';
import { useAppSize } from '@utils/modules/Size/useAppSize';
import { ColorValue } from 'react-native';

export type ElementsStyle = {
  elSize?: 'small' | 'medium' | 'large';
  elVariant?: 'default' | 'success' | 'error' | 'disabled';
};
type VariantStyle = {
  borderColor: ColorValue;
  placeholderTextColor?: ColorValue;
  backgroundColor?: ColorValue;
};

function useStyleInput({
  elSize = 'medium',
  elVariant = 'default',
}: ElementsStyle) {
  const { Sizes } = useAppSize();
  const { Colors } = useAppTheme();
  const size = { paddingVertical: Sizes.padding[elSize] };
  let variant: VariantStyle = { borderColor: Colors.input[elVariant] };

  if (elVariant === 'disabled') {
    variant = {
      placeholderTextColor: Colors.input.placeholder,
      borderColor: Colors.input.disabled,
      backgroundColor: Colors.input.disabled,
    };
  }

  return { size, variant };
}

export { useStyleInput };
