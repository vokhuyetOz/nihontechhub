import React from 'react';

import { View } from 'react-native';

import { AppDivider } from '@elements/AppDivider/AppDivider';
import { AppIcon, AppIconProps } from '@elements/AppIcon';
import { AppText } from '@elements/AppText';
import { AppTouchable } from '@elements/AppTouchable';
import { useNavigation } from '@react-navigation/core';
// import { setActionRequireLogin } from '@screens/Login/modules/useRequireLogin';
import {
  // useAppAccount,
  useAppLanguage,
  useAppSize,
  useAppTheme,
} from '@utils/modules';
import type { TabStackScreenProps } from '@utils/navigation/types';
import { ComonStyle } from '@utils/resource';

type TMenuFunctionItemData = AppIconProps & { title: string };

type TMenuFunctionItemProp = Readonly<{
  data: TMenuFunctionItemData;
}>;

function MenuFunctionItem({ data }: TMenuFunctionItemProp) {
  const { Sizes } = useAppSize();
  const { Colors } = useAppTheme();
  return (
    <AppTouchable onPress={data.onPress}>
      <View
        style={[
          ComonStyle.shadow(),
          {
            width: Sizes.wpx(180),
            borderRadius: Sizes.border_radius,
            padding: Sizes.padding.default,
            marginTop: Sizes.padding.default,
            backgroundColor: Colors.app.Background_Base,
          },
        ]}
      >
        <AppIcon {...data} onlyIcon />
        <AppText
          style={{
            fontSize: Sizes.large,
            fontWeight: '500',
            paddingTop: Sizes.padding.default,
          }}
        >
          {data.title}
        </AppText>
      </View>
    </AppTouchable>
  );
}

export function MenuFunction() {
  const { Strings } = useAppLanguage();
  const { Sizes } = useAppSize();
  const { Colors } = useAppTheme();
  // const { account } = useAppAccount();

  const navigation = useNavigation<TabStackScreenProps<'Menu'>['navigation']>();

  const menuList: TMenuFunctionItemData[] = [
    {
      title: Strings.Mode,
      name: 'theme-light-dark',
      type: 'MaterialDesignIcons',
      onPress: () => {
        navigation.navigate('Mode');
      },
    },
    {
      title: Strings.Language,
      name: 'translate-variant',
      onPress: () => {
        navigation.navigate('LanguageSetting');
      },
    },
    {
      title: Strings.Notification_setting,
      name: 'bell-ring-outline',
      color: Colors.app.Functional_Warning,
      type: 'MaterialDesignIcons',
      onPress: () => {
        navigation.navigate('NotificationSetting');
      },
    },
    // {
    //   title: Strings.Bookmarked,
    //   name: 'bookmark',
    //   type: 'MaterialDesignIcons',
    //   color: Colors.app.Functional_Success,
    //   onPress: () => {
    //     const action = () => {
    //       navigation.navigate('Bookmarked');
    //     };
    //     if (account?.token) {
    //       action();
    //       return;
    //     }
    //     setActionRequireLogin(action);
    //   },
    // },
    // {
    //   title: Strings.Liked,
    //   name: 'heart',
    //   color: Colors.app.Functional_Success,
    //   type: 'MaterialDesignIcons',
    //   onPress: () => {
    //     const action = () => {
    //       navigation.navigate('Liked');
    //     };
    //     if (account?.token) {
    //       action();
    //       return;
    //     }
    //     setActionRequireLogin(action);
    //   },
    // },
    {
      title: Strings.About_us,
      name: 'information-variant-box-outline',
      type: 'MaterialDesignIcons',
      onPress: () => {
        navigation.navigate('AboutUs');
      },
    },
  ];

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        {menuList.map(item => {
          return <MenuFunctionItem data={item} key={item.title} />;
        })}
      </View>
      <AppDivider
        offset={Sizes.padding.default}
        style={{
          marginTop: Sizes.padding.default,
          // paddingBottom: Sizes.padding.default,
        }}
      />
    </View>
  );
}
