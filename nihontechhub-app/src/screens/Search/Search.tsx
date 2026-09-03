import React from 'react';

import { useForm } from 'react-hook-form';

import { AppContainer } from '@elements/AppContainer';
import { Convert } from '@utils/modules';
import { TabStackScreenProps } from '@utils/navigation/types';
import { TDataRendering } from '@utils/rendering/types';

import { useRoute } from '@react-navigation/native';
import { SearchHeader } from './items/SearchHeader';
import { SearchList } from './items/SearchList';

export type TSearchProps = TabStackScreenProps<'Search'>;

export type TSearchForm = {
  searchKey: string;
};

export function Search() {
  const { params } = useRoute<TSearchProps['route']>();
  const form = useForm<TSearchForm>({
    defaultValues: {
      searchKey: params?.data || '',
    },
  });

  const DataRendering: TDataRendering = [
    {
      id: SearchHeader.name,
      component: SearchHeader,
    },
    {
      id: SearchList.name,
      component: SearchList,
    },
  ];

  return (
    <AppContainer form={form}>
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
