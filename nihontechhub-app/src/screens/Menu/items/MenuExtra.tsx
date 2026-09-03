import React from 'react';

import { Pressable, View } from 'react-native';
import { getVersion } from 'react-native-device-info';

import { AppIcon, TypeIconName } from '@elements/AppIcon';
import { AppText } from '@elements/AppText';
import { useAppLanguage, useAppSize, useAppTheme } from '@utils/modules';
// import { AppDivider } from '@elements/AppDivider/AppDivider';
import { useNavigation } from '@react-navigation/native';
import { TabStackScreenProps } from '@utils/navigation/types';

type TMenuExtraItem = {
  data: {
    title: string;
    icon: {
      name: TypeIconName;
      type?: any;
      size?: number;
      color?: string;
    };
    onPress: () => void;
  };
};

function MenuExtraItem({ data }: TMenuExtraItem) {
  const { Sizes } = useAppSize();

  return (
    <View style={{ marginHorizontal: Sizes.padding.small }}>
      <Pressable
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={data.onPress}
      >
        <AppIcon {...data?.icon} />
        <AppText style={{ marginLeft: Sizes.padding.small }}>
          {data.title}
        </AppText>
      </Pressable>
    </View>
  );
}
export function MenuExtra() {
  const { Sizes } = useAppSize();
  const { Strings } = useAppLanguage();
  const { Colors } = useAppTheme();
  const navigation = useNavigation<TabStackScreenProps<'Menu'>['navigation']>();

  const menuList: TMenuExtraItem['data'][] = [];

  // if (account?.token) {
  //   menuList.push({
  //     title: Strings.Logout,
  //     icon: {
  //       name: 'logout',
  //     },
  //     onPress: () => {
  //       if (account.provider === 'google') {
  //         GoogleAuth.signOut();
  //       }
  //       AccountService.remove();
  //     },
  //   });
  // } else {
  //   menuList.push({
  //     title: Strings.Login,
  //     icon: {
  //       name: 'login',
  //     },
  //     onPress: () => {
  //       // eslint-disable-next-line @typescript-eslint/no-empty-function
  //       setActionRequireLogin(() => {});
  //     },
  //   });
  // }

  return (
    <View>
      {menuList.map(item => {
        return <MenuExtraItem data={item} key={item.title} />;
      })}
      {/* <AppDivider
        offset={Sizes.padding.default}
        style={{
          marginTop: Sizes.padding.default,
        }}
      /> */}
      <AppText
        style={{
          padding: Sizes.padding.default,
          color: Colors.app.Text_Secondary,
        }}
      >
        {Strings.Current_version} : {getVersion()}
      </AppText>
    </View>
  );
}
