import React, { useEffect, useRef } from 'react';

import { Linking, View } from 'react-native';

import { renderFixedBackdrop } from '@elements/AppBottomSheetBackdrop/AppBottomSheetBackdrop';
import { AppButtonNormal } from '@elements/AppButtonNormal';
import { AppLogo } from '@elements/AppLogo';
import { AppText } from '@elements/AppText';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useAppLanguage, useAppSize, useAppTheme } from '@utils/modules';
import { ComonStyle } from '@utils/resource';

import { useQueryCheckAppVersion } from './modules/useQueryCheckAppVersion';

export function AppVersion() {
  const { Colors } = useAppTheme();
  const { Strings } = useAppLanguage();
  const { Sizes } = useAppSize();
  const { data } = useQueryCheckAppVersion();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
    if (data?.data?.require) {
      bottomSheetModalRef.current?.present();
    }
  }, [data?.data?.require]);

  if (!data?.data?.require) {
    return null;
  }
  const { title, description, link } = data.data;

  const onPress = async () => {
    try {
      await Linking.openURL(link);
    } catch {}
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={['60%']}
      enablePanDownToClose={false}
      enableDynamicSizing={false}
      backgroundStyle={ComonStyle.shadow()}
      backdropComponent={renderFixedBackdrop}
      handleComponent={null}
      index={0}
    >
      <View style={{ padding: Sizes.padding.default }}>
        <AppLogo />
        <AppText
          style={[
            ComonStyle.bold,
            ComonStyle.heading1,
            {
              marginVertical: Sizes.padding.default,
            },
          ]}
        >
          {title}
        </AppText>
        <AppText>{description}</AppText>
      </View>

      <AppButtonNormal
        onPress={onPress}
        title={Strings.Ok}
        style={{
          backgroundColor: Colors.app.Primary,
          borderRadius: Sizes.border_radius,
          marginHorizontal: Sizes.padding.default,
        }}
      />
    </BottomSheetModal>
  );
}
