import { AppContainer } from '@elements/AppContainer';
import { AppText } from '@elements/AppText';
import { Convert, useAppSize } from '@utils/modules';
import { TDataRendering } from '@utils/rendering/types';
import React from 'react';

export function ComingSoon() {
  const { Sizes } = useAppSize();
  const DataRendering: TDataRendering = [
    {
      id: AppText.name,
      component: AppText,
      children: 'Comming Soon',
      config: {
        style: {
          fontSize: Sizes.heading1,
          padding: Sizes.padding.default,
        },
      },
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
