import { View } from 'react-native';

import { AppText } from '@elements/AppText';
import { AppViewError } from '@elements/AppViewError';
import { AppViewLoading } from '@elements/AppViewLoading';
import { useAppLanguage, useAppSize, useAppTheme } from '@utils/modules';
import { ComonStyle } from '@utils/resource';

import { useQuerySearch } from '../modules/useQuerySearch';
import { FlashList } from '@shopify/flash-list';
import { TopNewsItem } from '@screens/TopPage/items/TopNewsItem';

function SearchListEmpty() {
  const { Sizes } = useAppSize();
  const { Colors } = useAppTheme();
  const { Strings } = useAppLanguage();

  return (
    <View
      style={[ComonStyle.center, { paddingHorizontal: Sizes.padding.default }]}
    >
      <AppText
        style={[
          ComonStyle.bold,
          ComonStyle.heading2,
          {
            paddingTop: Sizes.padding.huge,
            textAlign: 'center',
          },
        ]}
      >
        {Strings.Search_empty_title}
      </AppText>
      <AppText
        style={{
          color: Colors.app.Text_Secondary,
          paddingTop: Sizes.padding.large,
          textAlign: 'center',
        }}
      >
        {Strings.Search_empty_description}
      </AppText>
    </View>
  );
}

export function SearchList() {
  const { Sizes } = useAppSize();
  const { data, isLoading, error, refetch } = useQuerySearch();

  if (isLoading) {
    return <AppViewLoading style={{ paddingTop: Sizes.padding.default }} />;
  }
  if (error?.message) {
    return <AppViewError title={error.message} onPress={refetch} />;
  }

  return (
    <FlashList
      contentContainerStyle={{ paddingTop: Sizes.padding.default }}
      data={data ?? []}
      numColumns={Sizes.masonry_column}
      ListEmptyComponent={SearchListEmpty}
      renderItem={({ item, index }) => {
        return <TopNewsItem data={item} index={index} />;
      }}
    />
  );
}
