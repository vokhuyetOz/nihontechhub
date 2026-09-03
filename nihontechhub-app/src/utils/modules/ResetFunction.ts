import {PartialState, StackNavigationState} from '@react-navigation/native';
import * as NavigationService from '../navigation/NavigationService';
import {RootStackParamList, RootStackScreenProps} from '../navigation/types';

const ResetFunction = {
  //fix crash when navigation is not ready
  resetToHome: (
    navigation?: RootStackScreenProps<'AppIntro'>['navigation'],
  ) => {
    const config: PartialState<StackNavigationState<RootStackParamList>> = {
      index: 0,
      routes: [
        {
          name: 'SlideDraw',
          params: {
            name: 'MainNavigator',
            params: {
              screen: 'TabOneNavigator',
            },
          },
        },
      ],
    };
    if (navigation?.reset) {
      navigation.reset(config);
      return;
    }
    NavigationService.reset(config);
  },
  resetToLogin: (
    navigation?: RootStackScreenProps<'AppIntro'>['navigation'],
  ) => {
    const config: PartialState<StackNavigationState<RootStackParamList>> = {
      index: 0,
      routes: [
        {
          name: 'Login',
        },
      ],
    };
    if (navigation) {
      navigation.reset(config);
      return;
    }
    NavigationService.reset(config);
  },
};

export {ResetFunction};
