import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Sizes, useAppTheme } from '@utils/modules';

import { AppTouchable } from '../AppTouchable';
import { RadiosProps } from './AppInputRadios';

const Radios = ({
  data,
  value,
  onValueChange,
  style,
  itemStyle,
  unselectedRadioStyle,
  selectedRadioStyle,
  labelStyle,
  activeOpacity,
}: RadiosProps & { value: number }): JSX.Element => {
  const { Colors } = useAppTheme();

  const stylesRendering = StyleSheet.create({
    itemStyle: {
      alignItems: 'center',
      flexDirection: 'row',
      ...itemStyle,
    },
    labelStyle: {
      marginLeft: Sizes.padding.default,
      fontSize: Sizes.normal,
      color: Colors.app.Text_Title,
      ...labelStyle,
    },
    unselectedRadioStyle: {
      borderWidth: 1,
      borderColor: Colors.radio.inactive,
    },
    RadioStyle: {
      height: Sizes.padding.default * 1.2,
      width: Sizes.padding.default * 1.2,
      borderRadius: Sizes.padding.default * 0.6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedRadioStyle: {
      backgroundColor: Colors.radio.primary,
    },
    selectedDotStyle: {
      width: Sizes.padding.default * 0.5,
      height: Sizes.padding.default * 0.5,
      borderRadius: Sizes.padding.default * 0.4,
      backgroundColor: Colors.radio.background,
    },
  });
  const getRadioStyle = (itemId: number) => {
    if (itemId === value) {
      return { ...stylesRendering.selectedRadioStyle, ...selectedRadioStyle };
    }
    return { ...stylesRendering.unselectedRadioStyle, ...unselectedRadioStyle };
  };
  return (
    <View style={style}>
      {data?.map((item, index) => {
        let itemMargin;
        if (index === 0) {
          if (!style?.flexDirection || style?.flexDirection === 'column') {
            itemMargin = {
              marginTop: 0,
            };
          }
          if (style?.flexDirection === 'row') {
            itemMargin = {
              marginLeft: 0,
            };
          }
        }

        return (
          <AppTouchable
            key={item.id}
            style={
              [
                stylesRendering.itemStyle,
                itemMargin,
                { paddingVertical: 6 },
              ] as ViewStyle
            }
            onPress={() => {
              if (onValueChange) {
                onValueChange(item?.id);
              }
            }}
            activeOpacity={activeOpacity}
          >
            <View
              style={[
                getRadioStyle(item?.id as number),
                stylesRendering.RadioStyle,
              ]}
            >
              {value === item.id && (
                <View style={[stylesRendering.selectedDotStyle]} />
              )}
            </View>
            <Text style={[stylesRendering.labelStyle]}>{item.label}</Text>
          </AppTouchable>
        );
      })}
    </View>
  );
};

export { Radios };
