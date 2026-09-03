import React, { ReactNode } from 'react';

import { FormProvider, UseFormReturn } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { AppViewLoading } from '@elements/AppViewLoading';
import { useInteractionManager } from '@vokhuyet/native-hooks';

export type AppContainerProps = Readonly<{
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: Array<Edge>;
  needInteraction?: boolean;
  form?: UseFormReturn<any>;
}>;

export function AppContainer({
  children,
  style,
  edges = ['right', 'left'],
  needInteraction = false,
  form,
}: AppContainerProps) {
  const interaction = useInteractionManager();
  const renderContent = () => {
    if (!interaction && needInteraction) {
      return <AppViewLoading style={{ flex: 1 }} />;
    }
    return children;
  };

  if (form) {
    return (
      <FormProvider {...form}>
        <SafeAreaView
          edges={edges}
          style={[
            {
              flex: 1,
              justifyContent: 'flex-start',
            },
            style,
          ]}
        >
          {renderContent()}
        </SafeAreaView>
      </FormProvider>
    );
  }

  return (
    <SafeAreaView
      edges={edges}
      style={[
        {
          flex: 1,
          justifyContent: 'flex-start',
        },
        style,
      ]}
    >
      {renderContent()}
    </SafeAreaView>
  );
}
