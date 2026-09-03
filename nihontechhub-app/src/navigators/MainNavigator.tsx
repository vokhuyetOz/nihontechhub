import React from 'react';

import { ColorValue } from 'react-native';

import { AppIcon, AppIconProps } from '@elements/AppIcon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppLanguage, useAppSize, useAppTheme } from '@utils/modules';
import type { MainTabParamList } from '@utils/navigation/types';

import { AllStackNavigator } from './AllStackNavigator';
import { TabOneNavigator } from './TabOneNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();
const renderIcon =
  ({ name, type }: AppIconProps) =>
  ({ color }: { color: ColorValue }) => {
    const { Sizes } = useAppSize();
    return (
      <AppIcon
        name={name}
        type={type}
        color={color}
        onlyIcon
        size={Sizes.heading2}
      />
    );
  };

export function MainNavigator() {
  const { Colors } = useAppTheme();
  const { Strings } = useAppLanguage();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.app.Primary as string,
        tabBarInactiveTintColor: Colors.app.Text_Disable as string,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        headerShown: false,
      }}
      // initialRouteName="TabFourNavigator"
    >
      <Tab.Screen
        name="TabOneNavigator"
        component={TabOneNavigator}
        options={() => ({
          tabBarIcon: renderIcon({
            name: 'newspaper-variant-outline',
            type: 'MaterialDesignIcons',
          }),
          tabBarLabel: Strings.News,
        })}
      />

      <Tab.Screen
        name="TabTwoNavigator"
        component={AllStackNavigator}
        options={{
          tabBarIcon: renderIcon({
            name: 'brain',
          }),
          tabBarLabel: Strings.AICurated,
          headerShown: false,
        }}
        initialParams={{
          initialRouteName: 'Highlight',
        }}
      />

      <Tab.Screen
        name="TabThreeNavigator"
        component={AllStackNavigator}
        options={{
          tabBarIcon: renderIcon({
            name: 'trending-up',
          }),
          tabBarLabel: Strings.AI_Trend,
          headerShown: false,
        }}
        initialParams={{
          initialRouteName: 'Event',
        }}
      />
      <Tab.Screen
        name="TabFourNavigator"
        component={AllStackNavigator}
        options={() => ({
          tabBarIcon: renderIcon({
            name: 'puzzle-star-outline',
          }),
          tabBarLabel: Strings.Extension,
        })}
        initialParams={{
          initialRouteName: 'Extension',
        }}
      />
      <Tab.Screen
        name="TabFiveNavigator"
        component={AllStackNavigator}
        options={{
          tabBarIcon: renderIcon({
            name: 'menu',
          }),
          tabBarLabel: Strings.Menu,
        }}
        initialParams={{
          initialRouteName: 'Menu',
        }}
      />
    </Tab.Navigator>
  );
}
