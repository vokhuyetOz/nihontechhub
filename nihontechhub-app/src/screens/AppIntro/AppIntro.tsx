import React, { useEffect } from 'react';

import { View } from 'react-native';

import { AppViewLoading } from '@elements/AppViewLoading';
import { ResetFunction, useAppSize } from '@utils/modules';
import { RootStackScreenProps } from '@utils/navigation/types';

type TAppIntroProps = Readonly<RootStackScreenProps<'AppIntro'>>;

//TODO: check account state, navigate to wih or home
export function AppIntro({ navigation }: TAppIntroProps) {
  const { Sizes } = useAppSize();

  useEffect(() => {
    ResetFunction.resetToHome(navigation);
  }, []);
  return (
    <View
      style={{
        width: Sizes.device_width,
        height: Sizes.device_height,
        justifyContent: 'center',
      }}
    >
      <AppViewLoading />
    </View>
  );
}
