import React from 'react';

import { AppContainer } from '@elements/AppContainer';
import { Convert } from '@utils/modules';
import { TDataRendering } from '@utils/rendering/types';

import { AboutUsContactAt } from './items/AboutUsContactAt';
import { AboutUsDescription } from './items/AboutUsDescription';
import { AboutUsTitle } from './items/AboutUsTitle';

function AboutUs() {
  const DataRendering: TDataRendering = [
    {
      id: AboutUsTitle.name,
      component: AboutUsTitle,
    },
    {
      id: AboutUsDescription.name,
      component: AboutUsDescription,
    },
    {
      id: AboutUsContactAt.name,
      component: AboutUsContactAt,
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

export default AboutUs;
