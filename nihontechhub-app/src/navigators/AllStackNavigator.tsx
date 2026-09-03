import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutUs from '@screens/AboutUs/AboutUs';
import { Cate } from '@screens/Cate/Cate';
import { ComingSoon } from '@screens/ComingSoon/ComingSoon';
import { Detail } from '@screens/Detail/Detail';
import { Event } from '@screens/Event/Event';
import { Extension } from '@screens/Extension/Extension';
import { Highlight } from '@screens/Highlight/Highlight';
import { Menu } from '@screens/Menu/Menu';
import { Mode } from '@screens/Mode/Mode';
import { Search } from '@screens/Search/Search';
import { Tag } from '@screens/Tag/Tag';
import { useAppLanguage, useAppSize, useAppTheme } from '@utils/modules';
import type {
  MainTabScreenProps,
  TabStackNavigatorParamList,
} from '@utils/navigation/types';

import { headerRight } from './TabOneNavigator';
import { NotificationSetting } from '@screens/NotificationSetting/NotificationSetting';
import LanguageSetting from '@screens/LanguageSetting/LanguageSetting';

const Stack = createNativeStackNavigator<TabStackNavigatorParamList>();

type TAllStackNavigator = Readonly<
  MainTabScreenProps<
    | 'TabTwoNavigator'
    | 'TabThreeNavigator'
    | 'TabFourNavigator'
    | 'TabFiveNavigator'
  >
>;

export function AllStackNavigator({ route }: TAllStackNavigator) {
  const { initialRouteName } = route.params;
  const { Strings } = useAppLanguage();
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.app.Background_Base as string,
        },
        headerTitleStyle: {
          color: Colors.app.Text_Title as string,
          fontSize: Sizes.heading1,
        },
        headerTitleAlign: 'center',
        headerBackTitle: Strings.Back,
        headerTintColor: Colors.app.Text_Title as string,
      }}
    >
      <Stack.Screen
        name="Highlight"
        component={Highlight}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Event"
        component={Event}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: true, title: Strings.Search }}
      />
      <Stack.Screen
        name="NewsDetail"
        component={Detail}
        options={{
          headerShown: true,
          title: '',
        }}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          headerShown: true,
          title: Strings.About_us,
        }}
      />
      <Stack.Screen
        name="LanguageSetting"
        component={LanguageSetting}
        options={{
          headerShown: true,
          title: Strings.Language,
        }}
      />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
        options={{
          headerShown: true,
          title: Strings.Notification_setting,
        }}
      />
      <Stack.Screen
        name="Mode"
        component={Mode}
        options={{
          headerShown: true,
          title: Strings.Mode,
        }}
      />
      <Stack.Screen
        name="ComingSoon"
        component={ComingSoon}
        options={{
          headerTitle: 'Coming Soon',
        }}
      />
      <Stack.Screen
        name="Cate"
        component={Cate}
        options={({ navigation }) => ({
          headerRight: headerRight(navigation),
        })}
      />
      <Stack.Screen
        name="Tag"
        component={Tag}
        options={({ navigation }) => ({
          headerRight: headerRight(navigation),
        })}
      />
      <Stack.Screen
        name="Extension"
        component={Extension}
        options={{
          headerShown: true,
          title: Strings.Extension,
        }}
      />
    </Stack.Navigator>
  );
}
