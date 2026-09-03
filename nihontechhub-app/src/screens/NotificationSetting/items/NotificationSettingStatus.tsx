import { AppText } from '@elements/AppText';
import {
  AppPermission,
  requestFcmToken,
  useAppLanguage,
  useAppSize,
} from '@utils/modules';
import { useAppState } from '@vokhuyet/native-hooks';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { TNotificationSettingForm } from '../NotificationSetting';
import { AppDivider } from '@elements/AppDivider/AppDivider';
import { View } from 'react-native';
import { AppSwitch } from '@elements/AppSwitch';
import { openSettings } from 'react-native-permissions';
import { UserNotificationSettingService } from '@utils/modules/Notification/UserNotificationSettingService';

export function NotificationSettingStatus() {
  const { Sizes } = useAppSize();
  const { Strings } = useAppLanguage();

  const { setValue, control } = useFormContext<TNotificationSettingForm>();

  const appstate = useAppState();

  const status = useWatch({
    name: 'status',
    control,
    exact: true,
  });

  useEffect(() => {
    const handleChangeStatus = async () => {
      if (appstate !== 'active') {
        return;
      }
      const userSetting = UserNotificationSettingService.get();
      if (userSetting === false) {
        return;
      }

      const current = await AppPermission.checkNotification();
      setValue('status', current);
    };
    handleChangeStatus();
  }, [appstate]);

  useEffect(() => {
    const handleChangeStatus = async () => {
      if (!status) {
        return;
      }

      const isSuccess = await AppPermission.notification();
      if (!isSuccess) {
        openSettings('notifications').catch(() => {});
        setValue('status', false);
        return;
      }
      requestFcmToken();
    };
    handleChangeStatus();
  }, [status]);

  let label = Strings.Notification_Off;
  if (status) {
    label = Strings.Notification_On;
  }

  return (
    <View
      style={{
        padding: Sizes.padding.default,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <AppText>{Strings.Notification_status}</AppText>
        <AppSwitch
          name="status"
          label={label}
          onChangeValue={value => {
            UserNotificationSettingService.set(value);
          }}
        />
      </View>
      <AppDivider />
    </View>
  );
}
