import { FormInstance } from 'antd';

import { NotificationSettingForm } from '../notification-setting-form';

type NotificationSettingCreateProps = {
  form: FormInstance;
};

export const NotificationSettingCreate = ({
  form,
}: NotificationSettingCreateProps) => {
  return <NotificationSettingForm form={form} />;
};
