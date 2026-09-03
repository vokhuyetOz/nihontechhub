//https://reactnavigation.org/docs/typescript/#type-checking-the-navigator

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { TNews } from '@utils/modules/FetchApi/News/NewsAPI';
import type { WebViewSource } from 'react-native-webview/lib/WebViewTypes';

export type TabStackNavigatorParamList = {
  TopPage: undefined;
  Highlight: undefined;
  Event: undefined;
  Menu: undefined;
  Search: { data?: string };
  NewsDetail: { data: TNews };
  AboutUs: undefined;
  Mode: undefined;
  NotificationSetting: undefined;
  LanguageSetting: undefined;
  ComingSoon: undefined;
  Tag: { data: string };
  Cate: { data?: string };
  Extension: undefined;
};

export type MainTabParamList = {
  TabOneNavigator: NavigatorScreenParams<TabStackNavigatorParamList>;
  TabTwoNavigator: NavigatorScreenParams<TabStackNavigatorParamList> & {
    initialRouteName: keyof TabStackNavigatorParamList;
  };
  TabThreeNavigator: NavigatorScreenParams<TabStackNavigatorParamList> & {
    initialRouteName: keyof TabStackNavigatorParamList;
  };
  TabFourNavigator: NavigatorScreenParams<TabStackNavigatorParamList> & {
    initialRouteName: keyof TabStackNavigatorParamList;
  };
  TabFiveNavigator: NavigatorScreenParams<TabStackNavigatorParamList> & {
    initialRouteName: keyof TabStackNavigatorParamList;
  };
};
export type SlideDrawParamList = {
  MainNavigator: NavigatorScreenParams<MainTabParamList>;
};

export type RootStackParamList = {
  AppIntro: undefined;
  SlideDraw: NavigatorScreenParams<SlideDrawParamList>;
  Login: undefined;
  SignUp: undefined;
  NewsDetail: { data: Partial<TNews> };
  Web: { data: { source: WebViewSource } };
  ForgotPassword: undefined;
  Search: { data?: string };
  Cate: { data?: string };
  Tag: { data: string };
};
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type TabStackScreenProps<T extends keyof TabStackNavigatorParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabStackNavigatorParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type DrawerScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<SlideDrawParamList, 'MainNavigator'>,
  NativeStackNavigationProp<RootStackParamList>
>;
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}
