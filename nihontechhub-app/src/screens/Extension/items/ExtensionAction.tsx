import { useFormContext, useWatch } from 'react-hook-form';
import { Platform, View } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Share from 'react-native-share';

import { AppButtonNormal } from '@elements/AppButtonNormal';
import { AppText } from '@elements/AppText';
import { useAppLanguage, useAppSize, useAppTheme } from '@utils/modules';

import { TExtensionFormValues } from '../Extension.type';
import { getAnalytics } from '@react-native-firebase/analytics';

export function ExtensionAction() {
  const { Colors } = useAppTheme();
  const { Strings } = useAppLanguage();
  const { Sizes } = useAppSize();

  const { control, getValues } = useFormContext<TExtensionFormValues>();

  const file = useWatch({
    control,
    name: 'file',
    exact: true,
  });

  const onPressShare = async () => {
    if (!file?.url || !file.androidTmpFilePath) {
      return;
    }
    const url = getValues('url');
    getAnalytics().logShare({
      method: 'link',
      content_type: 'application/pdf',
      item_id: url,
    });
    console.log('onPressShare-file', file.androidTmpFilePath);
    try {
      if (Platform.OS === 'ios') {
        await Share.open({
          url: file.url,
          type: 'application/pdf',
        });
        return;
      }
      //android
      await Share.open({
        url: `file://${file.androidTmpFilePath}`,
        type: 'application/pdf',
      });
    } catch {}
  };
  const onPressViewIntent = () => {
    if (!file?.url) {
      return;
    }
    const url = getValues('url');
    getAnalytics().logEvent('view_intent', {
      item_id: url,
    });
    console.log('onPressViewIntent', file.url);
    if (Platform.OS === 'android') {
      ReactNativeBlobUtil.android.actionViewIntent(file.url, 'application/pdf');
      return;
    }
    ReactNativeBlobUtil.ios.openDocument(file.url);
  };

  if (!file?.name) {
    return null;
  }
  return (
    <View
      style={{
        marginTop: Sizes.padding.default,
        paddingHorizontal: Sizes.padding.default,
      }}
    >
      <AppText
        style={{
          marginBottom: Sizes.padding.small,
        }}
      >
        {Strings.File_info(file.name, file.page)}
      </AppText>
      {Platform.OS === 'ios' && (
        <AppText
          style={{
            marginBottom: Sizes.padding.small,
            color: Colors.app.Functional_Error,
          }}
        >
          {Strings.IOS_share_explain}
        </AppText>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <AppButtonNormal
          icon={{
            name: 'eye-outline',
          }}
          title={Strings.View}
          buttonVariant="outline"
          onPress={onPressViewIntent}
        />
        {Platform.OS === 'ios' && (
          <AppButtonNormal
            buttonVariant="outline"
            icon={{
              name: 'share-outline',
            }}
            title={Strings.Share}
            onPress={onPressShare}
          />
        )}
      </View>
    </View>
  );
}
