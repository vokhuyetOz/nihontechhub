import React from 'react';

import { renderBackdrop } from '@elements/AppBottomSheetBackdrop/AppBottomSheetBackdrop';
import BottomSheet from '@gorhom/bottom-sheet';
import { Convert, useAppSize, useAppTheme } from '@utils/modules';
import { ComonStyle } from '@utils/resource';

import type { TDataRendering } from '../../utils/rendering/types';

import BottomSheetKeyboardAwareScrollView from './items/BottomSheetKeyboardAwareScrollView';
import { ReportHeading } from './items/ReportHeading';
import { ReportInput } from './items/ReportInput';
import {
  setReportSelectedFeed,
  useReportSelectedFeed,
} from './modules/useReportSelectedFeed';

export type TReportFormValues = {
  email: string;
  password: string;
  rememberAccount: boolean;
};

/**
 * Report is used as a modal to override app
 * @returns
 */
export function Report() {
  const { Colors } = useAppTheme();
  const { Sizes } = useAppSize();
  const feed = useReportSelectedFeed();

  //don't display login bottomsheet
  if (!feed) {
    return null;
  }

  const DataRendering: TDataRendering = [
    {
      id: ReportHeading.name,
      component: ReportHeading,
    },
    {
      id: ReportInput.name,
      component: ReportInput,
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
      index={0}
      enableDynamicSizing={false}
      enablePanDownToClose={true}
      snapPoints={['60%', '90%']}
      backdropComponent={renderBackdrop}
      onClose={setReportSelectedFeed}
    >
      <BottomSheetKeyboardAwareScrollView
        style={{ padding: Sizes.padding.default }}
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
      </BottomSheetKeyboardAwareScrollView>
    </BottomSheet>
  );
}
