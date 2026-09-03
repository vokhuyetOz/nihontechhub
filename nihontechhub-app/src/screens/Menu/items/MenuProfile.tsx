import React from 'react';

import { View } from 'react-native';

import { AppDivider } from '@elements/AppDivider/AppDivider';
import { AppImage } from '@elements/AppImage';
import { AppText } from '@elements/AppText';
import { useAppAccount, useAppSize, useAppTheme } from '@utils/modules';
import { ComonStyle, randomPlaceholderColor } from '@utils/resource';

function MenuProfileInfo() {
  const { Colors } = useAppTheme();
  const { account } = useAppAccount();
  const { Sizes } = useAppSize();

  if (!account?.token) {
    return null;
  }
  console.log('account.profile', account);
  return (
    <>
      <View
        style={[
          ComonStyle.center,
          {
            width: Sizes.avatar,
            height: Sizes.avatar,
            borderRadius: Sizes.border_radius,
            backgroundColor: randomPlaceholderColor(),
          },
        ]}
      >
        <AppImage
          source={{ uri: account.profile?.avatar }}
          style={{
            width: Sizes.avatar,
            height: Sizes.avatar,
          }}
        />
      </View>
      <View style={{ flex: 1, paddingLeft: Sizes.padding.default }}>
        <AppText
          style={{
            fontSize: Sizes.larger,
            fontWeight: '500',
          }}
        >
          {account.profile?.name ??
            `${account.profile?.email}`.split('@')?.[0] ??
            'User'}
        </AppText>
        <AppText style={{ color: Colors.app.Text_Secondary }}>
          {account.provider}
        </AppText>
      </View>
    </>
  );
}
export function MenuProfile() {
  const { account } = useAppAccount();
  const { Sizes } = useAppSize();
  if (!account?.token) {
    return null;
  }

  return (
    <View
      style={[
        ComonStyle.center,
        {
          paddingTop: Sizes.padding.huge,
          paddingBottom: Sizes.padding.default,
          marginHorizontal: Sizes.padding.default,
          flexDirection: 'row',
        },
      ]}
    >
      <MenuProfileInfo />
      <AppDivider />
    </View>
  );
}
