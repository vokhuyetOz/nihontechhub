import { useAppTheme } from '@utils/modules';

type ElementsStyle = {
  elVariant?: 'default' | 'success' | 'error';
  disabled?: boolean;
};
function useStyleInputTextArea({
  elVariant = 'default',
  disabled,
}: ElementsStyle) {
  const { Colors } = useAppTheme();
  const variantStyle = {
    default: { borderColor: Colors.app.Shape_Border },
    success: { borderColor: Colors.app.Functional_Success },
    error: { borderColor: Colors.app.Functional_Error },
  }[elVariant];
  if (disabled) {
    return {
      borderColor: Colors.app.Background_Disable,
      placeholderTextColor: Colors.app.Background_Link,
      backgroundColor: Colors.app.Background_Disable,
    };
  }
  return { ...variantStyle };
}

export { useStyleInputTextArea };
