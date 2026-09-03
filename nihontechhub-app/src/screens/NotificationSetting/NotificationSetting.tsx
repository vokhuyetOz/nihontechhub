import React from 'react';

import { AppContainer } from '@elements/AppContainer';
import { Convert } from '@utils/modules';
import { TDataRendering } from '@utils/rendering/types';

// import { NotificationSettingTag } from './items/NotificationSettingTag';
import { NotificationSettingStatus } from './items/NotificationSettingStatus';
import { useForm } from 'react-hook-form';
import { UserNotificationSettingService } from '@utils/modules/Notification/UserNotificationSettingService';

export type TNotificationSettingForm = {
  status: boolean | null;
};

export function NotificationSetting() {
  const form = useForm<TNotificationSettingForm>({
    defaultValues: {
      status: UserNotificationSettingService.get(),
    },
  });

  const DataRendering: TDataRendering = [
    {
      id: NotificationSettingStatus.name,
      component: NotificationSettingStatus,
    },
    // {
    //   id: NotificationSettingTag.name,
    //   component: NotificationSettingTag,
    // },
  ];

  return (
    <AppContainer form={form}>
      {DataRendering.map((item, index) => {
        const Component = item.component;
        const children = Convert.dataRenderingChildren({ item });
        return (
          <Component key={`${index}`} {...item.config}>
            {children}
          </Component>
        );
      })}
    </AppContainer>
  );
}
