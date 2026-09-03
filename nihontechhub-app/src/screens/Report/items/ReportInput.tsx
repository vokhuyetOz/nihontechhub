import React, { useState } from 'react';

import { Pressable, View } from 'react-native';

import { AppIcon } from '@elements/AppIcon';
import { AppText } from '@elements/AppText';
import { AppViewLoading } from '@elements/AppViewLoading';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useAppLanguage, useAppSize, useAppTheme } from '@utils/modules';
import { ComonStyle } from '@utils/resource';
import { useMutationReport } from '../modules/useMutationReport';
import { useReportSelectedFeed } from '../modules/useReportSelectedFeed';

export function ReportInput() {
  const { Strings } = useAppLanguage();
  const { Sizes } = useAppSize();
  const { Colors } = useAppTheme();
  const [text, setText] = useState('');
  const mutationReport = useMutationReport();
  const feed = useReportSelectedFeed();

  const onPress = () => {
    if (!feed?.id || !text) {
      return;
    }
    setText('');
    mutationReport.mutateAsync({
      chapterId: feed.id,
      text,
    });
  };
  return (
    <View style={{ marginTop: Sizes.padding.default }}>
      <BottomSheetTextInput
        onChangeText={setText}
        value={text}
        placeholder={Strings.Report_des}
        multiline
        style={[
          ComonStyle.shadow(),
          {
            color: Colors.app.Text_Title as string,
            fontSize: Sizes.normal,
            paddingHorizontal: Sizes.padding.default,
            marginHorizontal: Sizes.padding.default,
            paddingVertical: Sizes.padding.small,
            flex: 1,
            minWidth: Sizes.wpx(375),
            alignSelf: 'center',
            borderRadius: Sizes.border_radius,
            height: Sizes.input_height * 5,
          },
        ]}
        placeholderTextColor={Colors.app.Text_Secondary as string}
      />
      <Pressable
        onPress={onPress}
        style={[
          ComonStyle.shadow(),
          ComonStyle.center,
          {
            height: Sizes.input_height,
            borderRadius: Sizes.border_radius,
            flexDirection: 'row',
            marginTop: Sizes.padding.default,
          },
        ]}
      >
        <AppIcon name="bug" color={Colors.app.Functional_Error} />
        <AppText
          style={{
            marginHorizontal: Sizes.padding.small,
            color: Colors.app.Functional_Error,
          }}
        >
          {Strings.Report}
        </AppText>
        {mutationReport.isPending && (
          <AppViewLoading
            sizeSpinner={Sizes.small}
            color={Colors.app.Text_Primary}
          />
        )}
      </Pressable>
    </View>
  );
}
