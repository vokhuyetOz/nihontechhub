import { AppText } from '@elements/AppText';
import { useAppLanguage, useAppSize, useAppTheme } from '@utils/modules';

export function ExtensionExplain() {
  const { Colors } = useAppTheme();
  const { Strings } = useAppLanguage();
  const { Sizes } = useAppSize();

  return (
    <AppText
      style={{
        color: Colors.app.Functional_Warning,
        padding: Sizes.padding.default,
      }}
    >
      {Strings.Extension_explain}
    </AppText>
  );
}
