import React from 'react';

import { AppContainer } from '@elements/AppContainer';
import { Convert } from '@utils/modules';
import { TDataRendering } from '@utils/rendering/types';

import { HighlightList } from './items/HighlightList';

export function Highlight() {
  const DataRendering: TDataRendering = [
    {
      id: HighlightList.name,
      component: HighlightList,
    },
  ];

  return (
    <AppContainer edges={['top', 'left', 'right']}>
      {DataRendering.map(item => {
        const Component = item.component;
        const children = Convert.dataRenderingChildren({ item });
        return (
          <Component key={item.id} {...item.config}>
            {children}
          </Component>
        );
      })}
    </AppContainer>
  );
}
