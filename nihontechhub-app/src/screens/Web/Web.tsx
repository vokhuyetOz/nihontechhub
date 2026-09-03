import React from 'react';

import { AppWeb } from '@elements/AppWeb';

import type { RootStackScreenProps } from '@utils/navigation/types';

type TWeb = Readonly<RootStackScreenProps<'Web'>>;

export function Web({ route }: TWeb) {
  const { source } = route.params.data;

  return <AppWeb source={source} />;
}
