import React from 'react';

import { AppContainer } from '@elements/AppContainer';
import { Convert } from '@utils/modules';
import { TDataRendering } from '@utils/rendering/types';

import { CateNews } from './items/CateNews';

export function Cate() {
  const DataRendering: TDataRendering = [
    {
      id: CateNews.name,
      component: CateNews,
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
