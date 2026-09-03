import React, { Fragment } from 'react';

import { View } from 'react-native';

import { AppDivider } from '@elements/AppDivider/AppDivider';
import {
  ModeService,
  useAppLanguage,
  useAppSize,
  useAppTheme,
} from '@utils/modules';
import { CheckLogic } from '@utils/resource';

import { AppIcon, AppIconProps } from '../../../elements/AppIcon/AppIcon';
import { AppText } from '../../../elements/AppText/AppText';
import { AppTouchable } from '../../../elements/AppTouchable/AppTouchable';

type TModeItemProp = {
  label: string;
  onPress?: () => void;
  selected?: boolean;
  icon: AppIconProps;
  value: string;
};
function ModeItem({ label, onPress, selected, icon }: TModeItemProp) {
  const { Sizes } = useAppSize();

  const { Colors } = useAppTheme();
  return (
    <AppTouchable
      onPress={onPress}
      style={{
        width: Sizes.device_width,
        paddingHorizontal: Sizes.padding.default,
      }}
    >
      <View
        style={{
          paddingVertical: Sizes.padding.default,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {!!icon && <AppIcon {...icon} />}
          <AppText
            style={{
              paddingLeft: Sizes.padding.default,
            }}
          >
            {label}
          </AppText>
        </View>
        {!!selected && (
          <AppIcon
            name={'lock-check-outline'}
            color={Colors.app.Functional_Success}
            size={Sizes.larger}
          />
        )}
      </View>
    </AppTouchable>
  );
}
export function ModeList() {
  const { Strings } = useAppLanguage();
  const { Colors, code = CheckLogic.Theme.base_device } = useAppTheme();
  const { Sizes } = useAppSize();

  const onPress = (item: TModeItemProp) => () => {
    if (item.value !== code) {
      ModeService.setCode(item.value);
    }
  };
  const modeList: TModeItemProp[] = [
    {
      label: Strings.Base_device,
      value: CheckLogic.Theme.base_device,
      icon: {
        name: 'cellphone-cog',
        color: Colors.app.Primary,
      },
    },
    {
      label: Strings.Dark_mode,
      value: CheckLogic.Theme.dark,
      icon: {
        name: 'moon-waning-crescent',
        // color: Colors.moon,
      },
    },
    {
      label: Strings.Light_mode,
      value: CheckLogic.Theme.light,
      icon: {
        name: 'weather-sunny',
        // color: Colors.sun,
      },
    },
  ];

  return (
    <View>
      {modeList.map((item, index) => {
        return (
          <Fragment key={`${index}`}>
            {index !== 0 && <AppDivider offset={Sizes.padding.default} />}
            <ModeItem
              {...item}
              selected={item.value === code}
              onPress={onPress(item)}
            />
          </Fragment>
        );
      })}
    </View>
  );
}
