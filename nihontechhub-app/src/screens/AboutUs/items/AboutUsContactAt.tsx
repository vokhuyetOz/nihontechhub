//import liraries
import React from 'react';

import { AppText } from '@elements/AppText';
import { useAppLanguage, useAppSize } from '@utils/modules';
import { ComonStyle } from '@utils/resource';

export function AboutUsContactAt() {
  const { Strings } = useAppLanguage();
  const { Sizes } = useAppSize();

  return (
    <AppText
      style={[
        ComonStyle.bold,
        {
          fontSize: Sizes.large,
          padding: Sizes.padding.default,
        },
      ]}
    >
      {Strings.Contact_at('nihontechhub@gmail.com')}
    </AppText>
  );
}
