//import liraries
import React from 'react';

import { View } from 'react-native';

import { AppText } from '@elements/AppText';
import { useAppLanguage, useAppSize, useAppTheme } from '@utils/modules';
import { ComonStyle } from '@utils/resource';

export function AboutUsTitle() {
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();
  const { Strings } = useAppLanguage();

  return (
    <View>
      <AppText
        style={[
          ComonStyle.bold,
          ComonStyle.heading1,
          {
            textAlign: 'center',
            color: Colors.app.Primary,
            marginTop: Sizes.padding.huge,
          },
        ]}
      >
        {Strings.App_name}
      </AppText>
      <AppText
        style={[
          ComonStyle.bold,
          ComonStyle.heading1,
          {
            textAlign: 'center',
            color: Colors.app.Primary,
            marginTop: Sizes.padding.default,
          },
        ]}
      >
        {Strings.AboutUsTitle}
      </AppText>
      <View style={ComonStyle.center}>
        <View>
          <AppText
            style={[
              ComonStyle.bold,
              { fontSize: Sizes.heading2 * 2, lineHeight: Sizes.heading2 * 3 },
            ]}
          >
            Fres
          </AppText>
          <AppText
            style={[
              ComonStyle.bold,
              {
                fontSize: Sizes.heading2 * 2,
                top: -Sizes.heading2 * 2,
                paddingLeft: Sizes.heading2 * 4,
                lineHeight: Sizes.heading2 * 3,
              },
            ]}
          >
            Co
          </AppText>
        </View>
      </View>
    </View>
  );
}
