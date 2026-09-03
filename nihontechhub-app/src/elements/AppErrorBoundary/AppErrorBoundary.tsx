import React from 'react';

import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppSize, useAppTheme } from '@utils/modules';

import { AppContainer } from '../AppContainer/AppContainer';
import { AppViewError } from '../AppViewError/AppViewError';

export type AppErrorBoundaryProps = Readonly<{
  error?: string | Error;
  resetError?: () => void;
}>;
export function AppErrorBoundary({ error, resetError }: AppErrorBoundaryProps) {
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();
  const insets = useSafeAreaInsets();

  return (
    <AppContainer>
      <View
        style={{
          backgroundColor: Colors.app.Shape_Icon,
          paddingTop: insets.top,
        }}
      >
        <View
          style={{
            width: Sizes.device_width,
            flexDirection: 'row',
            justifyContent: 'center',
            padding: Sizes.padding.default,
            backgroundColor: Colors.app.Shape_Icon,
            alignItems: 'center',
          }}
        />
      </View>
      <AppViewError
        title={`${error?.toString()}\nTry again`}
        onPress={resetError}
        style={{ marginTop: Sizes.padding.default * 5 }}
        titleStyle={{ textAlign: 'center' }}
      />
    </AppContainer>
  );
}
