import React from 'react';

import { AppContainer } from '@elements/AppContainer';
import { Convert } from '@utils/modules';
import { TDataRendering } from '@utils/rendering/types';

import { EventList } from './items/EventList';

export function Event() {
  const DataRendering: TDataRendering = [
    {
      id: EventList.name,
      component: EventList,
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
