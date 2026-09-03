import { View } from 'react-native';

import { AppDivider } from '@elements/AppDivider/AppDivider';
import { AppText } from '@elements/AppText';
import { TopNewsItem } from '@screens/TopPage/items/TopNewsItem';
import { useAppLanguage, useAppSize } from '@utils/modules';
import { TNews } from '@utils/modules/FetchApi/News/NewsAPI';
import { ComonStyle } from '@utils/resource';

import { useQueryNewsRelated } from '../modules/useQueryNewsRelated';

export function DetailRelated({ data }: Readonly<{ data: TNews }>) {
  const { Sizes } = useAppSize();
  const { Strings } = useAppLanguage();
  const { data: relatedNews } = useQueryNewsRelated(data.id, data.tags);

  if (!relatedNews?.length) {
    return null;
  }

  return (
    <View
      style={{
        paddingBottom: Sizes.padding.default,
        paddingTop: Sizes.padding.huge,
      }}
    >
      <AppDivider offset={Sizes.padding.default} />
      <AppText
        style={[
          ComonStyle.bold,
          ComonStyle.heading1,
          {
            paddingHorizontal: Sizes.padding.default,
            paddingTop: Sizes.padding.default,
          },
        ]}
      >
        {Strings.Related_news}
      </AppText>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {relatedNews.map((item, index) => (
          <View key={item.id}>
            <TopNewsItem data={item} index={index} />
          </View>
        ))}
      </View>
    </View>
  );
}
