import React from 'react';

import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';

import { AppContainer } from '@elements/AppContainer/AppContainer';
import { Convert } from '@utils/modules';
import type { TDataRendering } from '@utils/rendering/types';

import { TExtensionFormValues } from './Extension.type';
import { ExtensionAction } from './items/ExtensionAction';
import { ExtensionExplain } from './items/ExtensionExplain';
import { ExtensionHandle } from './items/ExtensionHandle';
import { ExtensionHeader } from './items/ExtensionHeader';
import { ExtensionInput } from './items/ExtensionInput';
import { ExtensionStatus } from './items/ExtensionStatus';

export function Extension() {
  const form = useForm<TExtensionFormValues>({
    defaultValues: {
      status: 'init',
      // url: 'https://drive.google.com/file/d/1Z7wDoyHwxcysmoy18B32Ahe_gnRcFvBe/preview',
      // url: 'https://drive.google.com/file/d/1t21OAnpEgi3F3aalqNyq1ot72qra3eLB/preview',
      url: '',
    },
    mode: 'onSubmit',
  });
  const DataRendering: TDataRendering = [
    {
      id: ExtensionHeader.name,
      component: ExtensionHeader,
    },
    {
      id: ExtensionInput.name,
      component: ExtensionInput,
    },
    {
      id: ExtensionStatus.name,
      component: ExtensionStatus,
    },
    {
      id: ExtensionAction.name,
      component: ExtensionAction,
    },
    {
      id: ExtensionExplain.name,
      component: ExtensionExplain,
    },
  ];

  return (
    <AppContainer form={form}>
      <ExtensionHandle />
      <ScrollView>
        {DataRendering.map(item => {
          const Component = item.component;
          const children = Convert.dataRenderingChildren({ item });
          return (
            <Component key={`${item.id}`} {...item.config}>
              {children}
            </Component>
          );
        })}
      </ScrollView>
    </AppContainer>
  );
}
