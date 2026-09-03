import { useFormContext, useWatch } from 'react-hook-form';

import { AppText } from '@elements/AppText';
import { useAppLanguage, useAppSize, useAppTheme } from '@utils/modules';
import { ComonStyle } from '@utils/resource';

import { TExtensionFormValues } from '../Extension.type';

export function ExtensionStatus() {
  const { Colors } = useAppTheme();
  const { Strings } = useAppLanguage();
  const { Sizes } = useAppSize();

  const { control } = useFormContext<TExtensionFormValues>();

  const status = useWatch({
    control,
    name: 'status',
    exact: true,
  });
  if (status === 'init') {
    return null;
  }
  return (
    <AppText
      style={[
        ComonStyle.smaller,
        {
          color: Colors.app.Functional_Link,
          paddingHorizontal: Sizes.padding.default,
        },
      ]}
    >
      {Strings.Extension_status[status]}
    </AppText>
  );
}
