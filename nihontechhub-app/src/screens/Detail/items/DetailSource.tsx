import { TNews } from '@utils/modules/FetchApi/News/NewsAPI';
import { View } from 'react-native';
import { AppText } from '@elements/AppText';
import {
  estimateReadTime,
  useAppLanguage,
  useAppSize,
  useAppTheme,
} from '@utils/modules';
import { ComonStyle } from '@utils/resource';
import { AppIcon } from '@elements/AppIcon';
import { AppTouchable } from '@elements/AppTouchable';
import { useNavigation } from '@react-navigation/native';

export function DetailSource({ data }: Readonly<{ data: TNews }>) {
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();
  const { Strings } = useAppLanguage();
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Cate', { data: data.source });
  };

  return (
    <AppTouchable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Sizes.padding.default,
      }}
    >
      <View />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <AppText
          style={[
            ComonStyle.border(Colors.app.Text_HighLight),
            {
              color: Colors.app.Text_HighLight,
              borderRadius: Sizes.oval_radius,
              paddingHorizontal: Sizes.padding.small,
              paddingVertical: Sizes.padding.smaller,
              marginRight: Sizes.padding.default,
            },
          ]}
        >
          {data.source}
        </AppText>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AppIcon
            name="clock"
            size={Sizes.small}
            color={Colors.app.Text_Secondary}
          />
          <AppText
            style={{
              color: Colors.app.Text_Secondary,
              fontSize: Sizes.small,
              marginLeft: Sizes.padding.tiny,
            }}
          >
            {Strings.X_min_read(estimateReadTime(data.content))}
          </AppText>
        </View>
      </View>
    </AppTouchable>
  );
}
