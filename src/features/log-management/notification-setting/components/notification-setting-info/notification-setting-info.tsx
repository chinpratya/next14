import { FormInstance } from 'antd';

import { NotificationSettingForm } from '../notification-setting-form';

type NotificationSettingInfoProps = {
  form: FormInstance;
  provider: string;
};

export const NotificationSettingInfo = ({
  form,
  provider,
}: NotificationSettingInfoProps) => {
  const isDefault = provider === 'DEFAULT';
  return (
    <NotificationSettingForm
      form={form}
      isDefault={isDefault}
      isEditor
    />
  );
};
