import { AppText } from '@elements/AppText';
import { useAppLanguage, useAppSize } from '@utils/modules';
import { View } from 'react-native';

export function EventHeader() {
  const { Strings } = useAppLanguage();
  const { Sizes } = useAppSize();

  return (
    <View
      style={{
        borderRadius: Sizes.oval_radius,
        borderWidth: 1,
        borderColor: '#d1fae5', // blue-100
        padding: Sizes.padding.default,
        marginHorizontal: Sizes.padding.default,
        marginTop: Sizes.padding.default,
        backgroundColor: '#ecfdf5', // dùng blue-50 để mô phỏng gradient nền nhẹ
      }}
    >
      <AppText style={{ color: '#6b7280' }}>
        <AppText style={{ fontWeight: '600', color: '#047857' }}>
          {Strings.smartNewsSynthesis}:
        </AppText>
        {Strings.smartNewsSynthesisDesc}
      </AppText>
    </View>
  );
}
