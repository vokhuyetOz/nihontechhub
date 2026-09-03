import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { View, ViewStyle } from 'react-native';

import { AppIcon } from '@elements/AppIcon';
import { AppText } from '@elements/AppText';
import { Sizes, useAppTheme } from '@utils/modules';

type TAppSimpleSlider = Readonly<{
  name: string;
  defaultValue?: any;
  max?: number;
  min?: number;
  containerStyle?: ViewStyle;
  control: Control;
  notedTitle?: string;
  sliderLength?: number;
  showPopup?: boolean;
}>;
export function AppSimpleSlider({
  name,
  defaultValue = [0],
  max = 300,
  min = 0,
  containerStyle,
  sliderLength = Sizes.wpx(335),
  control,
  notedTitle,
  showPopup = true,
  ...props
}: TAppSimpleSlider) {
  const { Colors } = useAppTheme();
  const defaultValue1 = defaultValue?.[0] ?? min;
  const renderPopup = ({ value }: any) => {
    if (!showPopup) {
      return null;
    }
    return (
      <SliderPopup height={value?.[0]} max={max} notedTitle={notedTitle} />
    );
  };
  return (
    <Controller
      defaultValue={[defaultValue1]}
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <View
            style={{
              paddingHorizontal: Sizes.wpx(20),
              marginTop: Sizes.wpx(35),
              ...containerStyle,
            }}
          >
            <MultiSlider
              values={value}
              min={min}
              max={max}
              step={1}
              onValuesChange={value => onChange(value)}
              containerStyle={{
                width: Sizes.wpx(335),
                alignSelf: 'center',
              }}
              sliderLength={sliderLength}
              selectedStyle={{ backgroundColor: Colors.app.Primary }}
              customMarker={AppSimpleSliderMarker}
              trackStyle={{
                backgroundColor: Colors.progressStep.inactive,
                height: 2,
              }}
              {...props}
            />
            {renderPopup({ value })}
          </View>
        );
      }}
    />
  );
}

function AppSimpleSliderMarker() {
  const { Colors } = useAppTheme();
  return (
    <View
      style={{
        width: 24,
        height: 24,
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: 'white',
        borderColor: Colors.app.Primary,
      }}
    />
  );
}

type TSliderPopup = Readonly<{
  height: number;
  notedTitle?: string;
  max: number;
}>;
function SliderPopup({ height = 0, notedTitle = '', max }: TSliderPopup) {
  const { Colors } = useAppTheme();
  return (
    <View
      style={{
        position: 'absolute',
        top: -35,
        left: height * (335 / max),
      }}
    >
      <View
        style={{
          height: Sizes.wpx(34),
          width: Sizes.wpx(52),
          borderWidth: 1,
          borderRadius: Sizes.wpx(10),
          borderColor: Colors.app.Shape_Border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AppText style={{ fontSize: Sizes.little }}>
          {`${height || 0}${notedTitle}`}
        </AppText>
      </View>
      <View style={{ left: Sizes.wpx(20), top: -2 }}>
        <AppIcon type={'Figma'} name={'downArrow'} />
      </View>
    </View>
  );
}
