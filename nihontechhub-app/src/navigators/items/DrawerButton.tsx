import React from 'react';

import { AppIcon } from '@elements/AppIcon';
import { useNavigation } from '@react-navigation/core';
import { Sizes } from '@utils/modules';
import type { DrawerScreenNavigationProp } from '@utils/navigation/types';

export function DrawerButton() {
  const navigation = useNavigation<DrawerScreenNavigationProp>();
  return (
    <AppIcon
      name={'menuunfold'}
      type={'MaterialDesignIcons'}
      style={{
        paddingHorizontal: Sizes.padding.default,
      }}
      hasHitSlop
      onPress={() => {
        navigation.toggleDrawer();
      }}
    />
  );
}
