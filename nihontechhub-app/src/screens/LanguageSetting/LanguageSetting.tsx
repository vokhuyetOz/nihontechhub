import React from 'react';

import { AppContainer } from '@elements/AppContainer';
import { Convert } from '@utils/modules';
import { TDataRendering } from '@utils/rendering/types';

import { LanguageList } from './items/LanguageList';

function LanguageSetting() {
  const DataRendering: TDataRendering = [
    {
      id: LanguageList.name,
      component: LanguageList,
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
export default LanguageSetting;
