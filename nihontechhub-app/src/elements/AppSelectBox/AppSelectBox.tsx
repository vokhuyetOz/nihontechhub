import React, { useRef, useState } from 'react';

import { useController } from 'react-hook-form';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {
  BottomSheetFlashList,
  BottomSheetModal,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {
  Convert,
  useAppLanguage,
  useAppSize,
  useAppTheme,
} from '@utils/modules';
import { ComonStyle } from '@utils/resource';

import { AppText } from '../AppText/AppText';

import { AppSelectBoxTriangle } from './AppSelectBoxTriangle';

type TAppSelectBoxProps = {
  name: string;
  data: Array<{ name?: string; id: string; index: number }>;
  displayKey?: 'name' | 'index';
  searchPlaceHolder?: string;
  onPress?: null | ((event: GestureResponderEvent) => void);
};

export function AppSelectBox({
  name,
  data,
  displayKey = 'index',
  searchPlaceHolder,
}: TAppSelectBoxProps) {
  const { Colors } = useAppTheme();
  const { Strings } = useAppLanguage();
  const { Sizes } = useAppSize();

  const { field } = useController({ name });

  const sheetRef = useRef<BottomSheetModal>(null);
  const [searchKey, setSearchKey] = useState('');

  const animatedIndex = useSharedValue(-1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(
          animatedIndex.value,
          [-1, 0],
          [0, 90],
          Extrapolation.CLAMP,
        )}deg`,
      },
    ],
  }));

  const handlePress = () => {
    if (animatedIndex.value === 0) {
      animatedIndex.value = -1;
      sheetRef.current?.close();
      return;
    }

    sheetRef.current?.present();
  };
  const handlePressItem =
    (item: { name?: string; id: string; index: number }) => () => {
      field.onChange(item);
      sheetRef.current?.dismiss();
    };

  let list = data;

  if (searchKey.length > 0) {
    list = Convert.searchItems(data, searchKey);
  }

  let display = field.value?.name;
  if (displayKey === 'index') {
    display = Strings.Chapter_index((field.value?.[displayKey] ?? 0) + 1);
  }

  return (
    <Pressable onPress={handlePress}>
      <View
        style={[
          ComonStyle.shadow(),
          ComonStyle.center,
          {
            flexDirection: 'row',
            minWidth: Sizes.wpx(160),
            paddingHorizontal: Sizes.padding.default,
            paddingVertical: Sizes.padding.medium,
            borderRadius: Sizes.border_radius,
            backgroundColor: Colors.app.Background_Base,
          },
        ]}
      >
        <AppText style={{ color: Colors.app.Primary as string }}>
          {display}
        </AppText>
        <Animated.View
          style={[{ position: 'absolute', right: Sizes.tiny }, animatedStyle]}
        >
          <AppSelectBoxTriangle
            color={Colors.app.Primary as string}
            size={Sizes.small}
          />
        </Animated.View>
      </View>
      <BottomSheetModal
        ref={sheetRef}
        animatedIndex={animatedIndex}
        backgroundStyle={[
          ComonStyle.shadow(),
          {
            backgroundColor: Colors.app.Background_Base as string,
          },
        ]}
        index={0}
        enableDynamicSizing={false}
        snapPoints={['85%']}
        keyboardBehavior={'extend'}
      >
        <BottomSheetTextInput
          autoCapitalize={'none'}
          onChangeText={setSearchKey}
          maxLength={50}
          value={searchKey}
          autoCorrect={false}
          spellCheck={false}
          placeholder={searchPlaceHolder ?? Strings.Input_chapter_index}
          style={[
            ComonStyle.shadow(),
            {
              color: Colors.app.Text_Title as string,
              fontSize: Sizes.normal,
              paddingHorizontal: Sizes.padding.default,
              paddingVertical: Sizes.padding.small,
              width: Sizes.device_width - Sizes.padding.default * 2,
              maxWidth: Sizes.wpx(375),
              alignSelf: 'center',
              borderRadius: Sizes.border_radius,
              marginBottom: Sizes.padding.default,
              marginTop: Sizes.padding.small,
              height: Sizes.input_height,
              backgroundColor: Colors.app.Background_Base,
            },
          ]}
          placeholderTextColor={Colors.app.Text_Secondary as string}
        />
        <BottomSheetFlashList
          contentContainerStyle={{
            paddingBottom: Sizes.padding.default,
          }}
          numColumns={Sizes.masonry_column}
          data={list}
          masonry
          renderItem={({ item }) => {
            const selected = field.value?.id === item.id;
            let textColor = Colors.app.Text_Title as string;
            if (selected) {
              textColor = Colors.app.Primary as string;
            }
            return (
              <Pressable onPress={handlePressItem(item)}>
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
                    style={{
                      color: textColor,
                    }}
                  >
                    <AppText style={ComonStyle.bold}>{item.index + 1}</AppText>:{' '}
                    {item.name || '----------'}
                  </AppText>
                </View>
              </Pressable>
            );
          }}
        />
      </BottomSheetModal>
    </Pressable>
  );
}
