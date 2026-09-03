import React from 'react';

import { AppContainer } from '@elements/AppContainer';
import { Convert } from '@utils/modules';
import type { TDataRendering } from '@utils/rendering/types';

import { MenuExtra } from './items/MenuExtra';
import { MenuFunction } from './items/MenuFunction';
// import { MenuProfile } from './items/MenuProfile';
import { MenuSource } from './items/MenuSource';

export function Menu() {
  const DataRendering: TDataRendering = [
    // {
    //   id: MenuProfile.name,
    //   component: MenuProfile,
    // },
    {
      id: MenuFunction.name,
      component: MenuFunction,
    },
    {
      id: MenuSource.name,
      component: MenuSource,
    },
    {
      id: MenuExtra.name,
      component: MenuExtra,
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
