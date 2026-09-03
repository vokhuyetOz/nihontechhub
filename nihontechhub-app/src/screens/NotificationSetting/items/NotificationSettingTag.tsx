import React from 'react';

import { View } from 'react-native';

import { AppText } from '@elements/AppText';
import { AppTouchable } from '@elements/AppTouchable';
import { useAppLanguage, useAppSize, useAppTheme } from '@utils/modules';
import { ComonStyle } from '@utils/resource';
import { FlashList } from '@shopify/flash-list';

type TNotificationSettingTagItemProps = {
  data: {
    index: number;
    name: string;
  };
};
function NotificationSettingTagItem({
  data,
}: TNotificationSettingTagItemProps) {
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();

  return (
    <AppTouchable>
      <View
        style={[
          ComonStyle.border(Colors.app.Shape_Border),
          {
            paddingVertical: Sizes.padding.default,
            paddingHorizontal: Sizes.padding.small,
          },
        ]}
      >
        <AppText
        // style={{
        //   color: textColor,
        // }}
        >
          <AppText style={ComonStyle.bold}>{data.index}</AppText>:{' '}
          {data.name || '----------'}
        </AppText>
      </View>
    </AppTouchable>
  );
}
export function NotificationSettingTag() {
  const { Strings } = useAppLanguage();
  const { Sizes } = useAppSize();

  const data = [];

  if (!data?.length) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      <AppText>{Strings.Subscribe_tags}</AppText>
      <FlashList
        contentContainerStyle={{
          paddingVertical: Sizes.padding.default,
        }}
        numColumns={Sizes.masonry_column}
        data={data}
        masonry
        renderItem={({ item }) => {
          return <NotificationSettingTagItem data={item} />;
        }}
      />
    </View>
  );
}
