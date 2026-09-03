import React from 'react';

import { View } from 'react-native';

import { AppIcon } from '@elements/AppIcon';
import { AppImage } from '@elements/AppImage';
import { AppText } from '@elements/AppText';
import { useAppLanguage, useAppTheme } from '@utils/modules';
import { TNews } from '@utils/modules/FetchApi/News/NewsAPI';
import { useAppSize } from '@utils/modules/Size/useAppSize';
import { ComonStyle } from '@utils/resource';

export function TopNewsItemPublisher({
  data,
}: Readonly<{ data: TNews['author'] }>) {
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();
  const { Strings } = useAppLanguage();
  if (data?.avatar) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={[
            ComonStyle.center,
            {
              width: Sizes.avatar,
              height: Sizes.avatar,
              backgroundColor: Colors.app.Shape_Divider,
              borderRadius: Sizes.avatar / 2,
            },
          ]}
        >
          <AppImage
            source={{ uri: data.avatar }}
            resizeMode="cover"
            style={{
              width: Sizes.avatar,
              height: Sizes.avatar,
              borderRadius: Sizes.avatar / 2,
            }}
          />
        </View>
        <View style={{ marginHorizontal: Sizes.padding.small }}>
          <View
            style={{ flexDirection: 'row', paddingBottom: Sizes.padding.tiny }}
          >
            <AppText
              style={[
                ComonStyle.bold,
                {
                  color: Colors.app.Text_Primary,
                  marginRight: Sizes.padding.tiny,
                },
              ]}
            >
              {data?.name || 'NihonTechHub'}
            </AppText>
            <AppIcon
              onlyIcon
              name={'check-decagram-outline'}
              size={Sizes.smaller}
              color={Colors.app.Functional_Success}
            />
          </View>
          <AppText
            style={{ color: Colors.app.Text_Secondary, fontSize: Sizes.little }}
          >
            {data?.description ?? Strings.Publisher_translator}
          </AppText>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View
        style={[
          ComonStyle.center,
          {
            width: Sizes.avatar,
            height: Sizes.avatar,
            backgroundColor: Colors.app.Shape_Divider,
            borderRadius: Sizes.avatar / 2,
          },
        ]}
      >
        <AppText>N</AppText>
      </View>
      <View style={{ marginHorizontal: Sizes.padding.small }}>
        <View
          style={{ flexDirection: 'row', paddingBottom: Sizes.padding.tiny }}
        >
          <AppText
            style={[
              ComonStyle.bold,
              {
                color: Colors.app.Text_Primary,
                marginRight: Sizes.padding.tiny,
              },
            ]}
          >
            {data?.name || 'NihonTechHub'}
          </AppText>
          <AppIcon
            onlyIcon
            name={'check-decagram-outline'}
            size={Sizes.smaller}
            color={Colors.app.Functional_Success}
          />
        </View>
        <AppText
          style={{ color: Colors.app.Text_Secondary, fontSize: Sizes.little }}
        >
          {data?.description ?? Strings.Publisher_translator}
        </AppText>
      </View>
    </View>
  );
}
