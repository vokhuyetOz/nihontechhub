import React from 'react';

import { ScrollView } from 'react-native';

import { AppContainer } from '@elements/AppContainer';
import { Convert } from '@utils/modules';
import { TDataRendering } from '@utils/rendering/types';

import { DetailBasic } from './items/DetailBasic';
import { DetailRelated } from './items/DetailRelated';
import { DetailSource } from './items/DetailSource';
import { useQueryNewsDetail } from './modules/useQueryNewsDetail';

export function Detail() {
  const { data } = useQueryNewsDetail();

  const DataRendering: TDataRendering = [
    {
      id: DetailSource.name,
      component: DetailSource,
      config: { data },
    },
    {
      id: DetailBasic.name,
      component: DetailBasic,
      config: { data },
    },
    {
      id: DetailRelated.name,
      component: DetailRelated,
      config: { data },
    },
  ];

  return (
    <AppContainer>
      <ScrollView>
        {DataRendering.map(item => {
          const Component = item.component;
          const children = Convert.dataRenderingChildren({ item });
          return (
            <Component key={item.id} {...item.config}>
              {children}
            </Component>
          );
        })}
      </ScrollView>
    </AppContainer>
  );
}
