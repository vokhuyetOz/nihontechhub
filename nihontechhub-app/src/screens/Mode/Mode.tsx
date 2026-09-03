import React from 'react';

import { AppContainer } from '@elements/AppContainer/AppContainer';
import { Convert } from '@utils/modules';
import type { TDataRendering } from '@utils/rendering/types';

import { ModeList } from './items/ModeList';

export function Mode() {
  const DataRendering: TDataRendering = [
    {
      id: ModeList.name,
      component: ModeList,
    },
  ];

  return (
    <AppContainer>
      {DataRendering.map((item, index) => {
        const Component = item.component;
        const children = Convert.dataRenderingChildren({ item });
        return (
          <Component key={`${index}`} {...item.config}>
            {children}
          </Component>
        );
      })}
    </AppContainer>
  );
}
