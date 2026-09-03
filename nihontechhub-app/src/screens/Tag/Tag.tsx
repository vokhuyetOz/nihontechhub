import React from 'react';

import { AppContainer } from '@elements/AppContainer';
import { Convert } from '@utils/modules';
import { TDataRendering } from '@utils/rendering/types';

import { TagNews } from './items/TagNews';

export function Tag() {
  const DataRendering: TDataRendering = [
    {
      id: TagNews.name,
      component: TagNews,
    },
  ];

  return (
    <AppContainer>
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
