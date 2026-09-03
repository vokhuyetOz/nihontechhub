import { useFormContext, useWatch } from 'react-hook-form';
import { View } from 'react-native';

import { AppButtonNormal } from '@elements/AppButtonNormal';
import { AppInputText } from '@elements/AppInputText';
import {
  AppPermission,
  useAppLanguage,
  useAppSize,
  useAppTheme,
} from '@utils/modules';
import { ComonStyle } from '@utils/resource';

import { TExtensionFormValues } from '../Extension.type';
import { getAnalytics } from '@react-native-firebase/analytics';

export function ExtensionInput() {
  const { Colors } = useAppTheme();
  const { Strings } = useAppLanguage();
  const { Sizes } = useAppSize();

  const { setValue, control, getValues, handleSubmit } =
    useFormContext<TExtensionFormValues>();

  const status = useWatch({
    control,
    name: 'status',
    exact: true,
  });

  const onPressStart = async () => {
    const url = getValues('url');
    if (!url) {
      return;
    }
    getAnalytics().logEvent('start_create_pdf', {
      item_id: url,
    });
    const permission = await AppPermission.file();
    if (!permission) {
      return;
    }
    setValue('status', 'loading_url');
  };
  return (
    <View
      style={[
        ComonStyle.center,
        {
          padding: Sizes.padding.default,
        },
      ]}
    >
      <AppInputText
        name="url"
        clearButton
        style={[
          ComonStyle.border(Colors.app.Text_Primary),
          ComonStyle.shadow(),
          {
            borderRadius: Sizes.border_radius,
            width: '100%',
          },
        ]}
        rules={{
          required: {
            value: true,
            message: Strings.Url_is_required,
          },
        }}
        multiline
        placeholder={Strings.GDDowloader_placeholder}
        description={Strings.GDDowloader_explain}
      />
      <AppButtonNormal
        title={Strings.Create_PDF}
        onPress={handleSubmit(onPressStart)}
        style={{ marginTop: Sizes.padding.default }}
        loading={!!status.match(/loading_url|creating_pdf/)}
      />
    </View>
  );
}
