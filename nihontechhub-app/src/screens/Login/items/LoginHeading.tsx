import React from 'react';

import { AppText } from '@elements/AppText/AppText';
import { useAppLanguage, useAppSize } from '@utils/modules';
import { ComonStyle } from '@utils/resource';

export function LoginHeading() {
  const { Strings } = useAppLanguage();
  const { Sizes } = useAppSize();
  return (
    <AppText
      style={[
        ComonStyle.bold,
        {
          fontSize: Sizes.heading1,
          textAlign: 'left',
          margin: Sizes.padding.default,
        },
      ]}
    >
      {Strings.Login}
    </AppText>
  );
}
