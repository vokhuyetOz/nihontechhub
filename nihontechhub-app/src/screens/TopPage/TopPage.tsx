import React from 'react';

import { AppContainer } from '@elements/AppContainer';
import { Convert, useFcmNotification } from '@utils/modules';
import { TDataRendering } from '@utils/rendering/types';

import { TopNews } from './items/TopNews';

export function TopPage() {
  useFcmNotification();
  const DataRendering: TDataRendering = [
    {
      id: TopNews.name,
      component: TopNews,
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
