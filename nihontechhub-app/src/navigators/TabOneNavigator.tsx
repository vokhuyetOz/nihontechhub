import React, { useEffect } from 'react';

import { AppIcon } from '@elements/AppIcon';
import { AppLogo } from '@elements/AppLogo';
import { HeaderButton } from '@react-navigation/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Cate } from '@screens/Cate/Cate';
import { Detail } from '@screens/Detail/Detail';
import { Search } from '@screens/Search/Search';
import { Tag } from '@screens/Tag/Tag';
import { TopPage } from '@screens/TopPage/TopPage';
import {
  LanguageService,
  requestFcmToken,
  useAppLanguage,
  useAppSize,
  useAppTheme,
} from '@utils/modules';
import type { TabStackNavigatorParamList } from '@utils/navigation/types';

const Stack = createNativeStackNavigator<TabStackNavigatorParamList>();

export const headerRight = (navigation: any) => () => {
  const code = LanguageService.getCode();
  if (code === 'en') {
    return null;
  }
  return (
    <HeaderButton onPress={() => navigation.navigate('Search', { data: '' })}>
      <AppIcon name="text-box-search-outline" />
    </HeaderButton>
  );
};
const headerLeft = () => (
  <HeaderButton>
    <AppLogo size="medium" />
  </HeaderButton>
);

//props: MainTabScreenProps<'TabOneNavigator'>
export function TabOneNavigator() {
  const { Strings } = useAppLanguage();
  const { Sizes } = useAppSize();
  const { Colors } = useAppTheme();

  useEffect(() => {
    requestFcmToken();
  }, []);

  return (
    <Stack.Navigator
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
        name="TopPage"
        component={TopPage}
        options={({ navigation }) => ({
          headerTitle: Strings.App_name,
          headerLeft,
          headerRight: headerRight(navigation),
        })}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: true,
          title: Strings.Search,
        }}
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
    </Stack.Navigator>
  );
}
