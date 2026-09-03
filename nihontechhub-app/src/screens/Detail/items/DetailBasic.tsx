import { View } from 'react-native';
import { isTablet } from 'react-native-device-info';

import { AppImage } from '@elements/AppImage';
import { AppText } from '@elements/AppText';
import { TopNewsItemKeyword } from '@screens/TopPage/items/TopNewsItemKeyword';
import { TopNewsItemPublisher } from '@screens/TopPage/items/TopNewsItemPublisher';
import { TopNewsItemTag } from '@screens/TopPage/items/TopNewsItemTag';
import {
  formatDate,
  getSentences,
  useAppSize,
  useAppTheme,
} from '@utils/modules';
import { TNews } from '@utils/modules/FetchApi/News/NewsAPI';
import { ComonStyle } from '@utils/resource';

export function DetailBasic({ data }: Readonly<{ data: TNews }>) {
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();

  let itemWidth = Sizes.device_width - Sizes.padding.default * 2;
  if (isTablet()) {
    itemWidth = Sizes.device_width - Sizes.padding.default * 5;
  }
  const imageHeight = (itemWidth * 9) / 16;

  return (
    <View
      style={{
        paddingHorizontal: Sizes.padding.default,
      }}
    >
      <AppText
        style={[
          ComonStyle.bold,
          ComonStyle.heading2,
          {
            paddingVertical: Sizes.padding.default,
          },
        ]}
      >
        {data.title}
      </AppText>
      {getSentences(data.summary)?.map?.((item, index) => (
        <AppText
          key={`${index}`}
          style={[
            ComonStyle.large,
            {
              color: Colors.app.Text_Secondary,
              marginBottom: Sizes.padding.small,
            },
          ]}
        >
          {item}
        </AppText>
      ))}
      <TopNewsItemKeyword data={data.keywords} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: Sizes.padding.small,
          marginVertical: Sizes.padding.default,
        }}
      >
        <TopNewsItemPublisher data={data?.author} />
        <AppText style={{ color: Colors.app.Text_Secondary }}>
          {formatDate(data.updatedAt)}
        </AppText>
      </View>
      <AppImage
        style={{
          width: '100%',
          height: imageHeight,
          borderRadius: Sizes.border_radius,
          marginBottom: Sizes.padding.larger,
        }}
        borderRadius={Sizes.border_radius}
        resizeMode="cover"
        source={{
          uri: data.imageUrl,
        }}
      />
      {getSentences(data.content)?.map?.((item, index) => {
        return (
          <AppText
            key={`${index}`}
            style={[
              ComonStyle.large,
              {
                marginBottom: Sizes.padding.default,
              },
            ]}
          >
            {item}
          </AppText>
        );
      })}
      <TopNewsItemTag data={data.tags} />
    </View>
  );
}
