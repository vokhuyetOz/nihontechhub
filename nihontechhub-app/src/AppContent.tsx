import React, { useEffect, useRef } from 'react';

import { Platform, StatusBar, StatusBarStyle, UIManager } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import ErrorBoundary from 'react-native-error-boundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { createNotifications } from 'react-native-notificated';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import { AppErrorBoundary } from '@elements/AppErrorBoundary';
import { AppText } from '@elements/AppText';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { getAnalytics } from '@react-native-firebase/analytics';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppIntro } from '@screens/AppIntro/AppIntro';
import { AppVersion } from '@screens/AppVersion/AppVersion';
import { Login } from '@screens/Login/Login';
// import { useQueryProfile } from '@screens/Menu/modules/useQueryProfile';
import { Report } from '@screens/Report/Report';
import { Web } from '@screens/Web/Web';
import { ResetFunction, useAppTheme } from '@utils/modules';
import { useAppSize } from '@utils/modules/Size/useAppSize';
import { navigationRef } from '@utils/navigation/NavigationService';
import type {
  RootStackParamList,
  SlideDrawParamList,
} from '@utils/navigation/types';

import linking from './linking';
import { MainNavigator } from './navigators/MainNavigator';

const useInit = () => {
  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);

    // ReadConfigService.init(defaultConfig);
    //google sigin
    // const configure = async () => {
    //   try {
    //     await GoogleAuth.configure({
    //       webClientId: appKeys.googleSigninClientId, // Optional - for server verification
    //       scopes: [
    //         // Optional - additional OAuth scopes
    //         GoogleAuthScopes.EMAIL,
    //         GoogleAuthScopes.PROFILE,
    //       ],
    //     });
    //     console.log('Google Auth configured successfully');
    //   } catch (error) {
    //     getCrashlytics().recordError(error as Error);
    //     console.error('Configuration failed:', error);
    //   }
    // };
    // configure();
  }, []);

  // useQueryProfile();
};

const { NotificationsProvider } = createNotifications({
  notificationPosition: 'top',
  defaultStylesSettings: {
    globalConfig: {},
  },
});

const Drawer = createDrawerNavigator<SlideDrawParamList>();

const StackMain = createNativeStackNavigator<RootStackParamList>();

function SlideDraw() {
  const { Sizes } = useAppSize();
  function renderDrawer() {
    return (
      <AppText
        style={{ padding: Sizes.padding.default * 2, fontSize: Sizes.heading1 }}
        onPress={() => {
          ResetFunction.resetToHome();
        }}
      >
        Logout
      </AppText>
    );
  }
  return (
    <Drawer.Navigator
      screenOptions={{ drawerType: 'back', swipeEnabled: false }}
      drawerContent={renderDrawer}
    >
      <Drawer.Screen
        name="MainNavigator"
        component={MainNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

function AppContent() {
  const { Colors, code } = useAppTheme();

  const routeNameRef = useRef('');

  //initilize all defautl value of app
  useInit();

  let barStyle: StatusBarStyle = 'light-content';
  if (code === 'dark') {
    barStyle = 'dark-content';
  }
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar barStyle={barStyle} />
      <GestureHandlerRootView
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <NotificationsProvider>
          <KeyboardProvider>
            <BottomSheetModalProvider>
              <ErrorBoundary FallbackComponent={AppErrorBoundary}>
                <NavigationContainer
                  ref={navigationRef}
                  linking={linking as any} //FIXME: check linking config
                  theme={{
                    ...DefaultTheme,
                    colors: {
                      primary: Colors.button.primary as string,
                      background: Colors.app.Background_Base as string,
                      text: Colors.app.Text_Base as string,
                      card: Colors.app.Background_Base as string,
                      border: Colors.app.Shape_Border as string,
                      notification: Colors.app.Background_Error as string,
                    },
                  }}
                  onReady={() => {
                    setTimeout(() => {
                      RNBootSplash.hide({ fade: true });
                    }, 1000);
                    routeNameRef.current =
                      navigationRef.current?.getCurrentRoute?.()
                        ?.name as string;
                  }}
                  onStateChange={async () => {
                    const previousRouteName = routeNameRef.current;
                    const currentRouteName =
                      navigationRef.current?.getCurrentRoute?.()
                        ?.name as string;

                    if (previousRouteName !== currentRouteName) {
                      await getAnalytics().logScreenView({
                        screen_name: `${Platform.OS}_${currentRouteName}`,
                        screen_class: `${Platform.OS}_${currentRouteName}`,
                      });
                    }
                    routeNameRef.current = currentRouteName;
                  }}
                >
                  <StackMain.Navigator
                    screenOptions={{
                      headerShown: false,
                    }}
                  >
                    <StackMain.Screen name="AppIntro" component={AppIntro} />
                    <StackMain.Screen name="SlideDraw" component={SlideDraw} />
                    <StackMain.Screen name="Web" component={Web} />
                  </StackMain.Navigator>
                  <Report />
                  <Login />
                  <AppVersion />
                </NavigationContainer>
              </ErrorBoundary>
            </BottomSheetModalProvider>
          </KeyboardProvider>
        </NotificationsProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default AppContent;
