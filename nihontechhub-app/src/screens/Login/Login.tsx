import React from 'react';

import { renderBackdrop } from '@elements/AppBottomSheetBackdrop/AppBottomSheetBackdrop';
import BottomSheet from '@gorhom/bottom-sheet';
import { Convert, useAppTheme } from '@utils/modules';
import { ComonStyle } from '@utils/resource';

import type { TDataRendering } from '../../utils/rendering/types';

import { LoginForm } from './items/LoginForm';
import { LoginHeading } from './items/LoginHeading';
import {
  setActionRequireLogin,
  useRequireLogin,
} from './modules/useRequireLogin';

export type TLoginFormValues = {
  email: string;
  password: string;
  rememberAccount: boolean;
};

/**
 * Login is used as a modal to override app
 * @returns
 */
export function Login() {
  const { Colors } = useAppTheme();

  const action = useRequireLogin();

  //don't display login bottomsheet
  if (!action) {
    return null;
  }

  const DataRendering: TDataRendering = [
    {
      id: LoginHeading.name,
      component: LoginHeading,
    },
    {
      id: LoginForm.name,
      component: LoginForm,
    },
  ];

  return (
    <BottomSheet
      backgroundStyle={[
        ComonStyle.shadow(),
        {
          backgroundColor: Colors.app.Background_Base,
          shadowColor: Colors.app.Shape_Border,
        },
      ]}
      // index={0}
      enableDynamicSizing={false}
      enablePanDownToClose={true}
      snapPoints={['40%']}
      backdropComponent={renderBackdrop}
      onClose={setActionRequireLogin}
    >
      {DataRendering.map((item, index) => {
        const Component = item.component;
        const children = Convert.dataRenderingChildren({ item });
        return (
          <Component key={`${index}`} {...item.config}>
            {children}
          </Component>
        );
      })}
    </BottomSheet>
  );
}
