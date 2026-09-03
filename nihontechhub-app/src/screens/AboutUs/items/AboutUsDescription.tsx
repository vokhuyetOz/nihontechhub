//import liraries
import React from 'react';

import { AppText } from '@elements/AppText';
import { useAppLanguage, useAppSize } from '@utils/modules';
import { ComonStyle } from '@utils/resource';

export function AboutUsDescription() {
  const { Strings } = useAppLanguage();
  const { Sizes } = useAppSize();

  return (
    <AppText
      style={[
        ComonStyle.large,
        {
          paddingHorizontal: Sizes.padding.default,
        },
      ]}
    >
      {Strings.About_us_description}
    </AppText>
  );
}
