import { Button, Form } from 'antd';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { IntlMessage } from '@/components/util-components/intl-message';
import {
  NotificationSettingCreate,
  useCreateNotify,
} from '@/features/siem';
import { permissions, products } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const NotificationSettingCreatePage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'logManagement.notification.created'
      ) as string,
    });
    router.back();
    form.resetFields();
  };

  const { submit, isLoading } = useCreateNotify({
    onSuccess,
  });

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    const payload = {
      ...values,
      module: 'SIEM',
      config_default: !values.enabled_detail ?? true,
    };
    delete payload.enabled_detail;
    submit(payload);
  };

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="siem.subModule.notificationSetting" />
        }
        onBack={router.back}
        extra={
          <Button
            type="primary"
            onClick={onSubmit}
            loading={isLoading}
          >
            <IntlMessage id="logManagement.update" />
          </Button>
        }
      />
      <NotificationSettingCreate form={form} />
    </>
  );
};

NotificationSettingCreatePage.getLayout =
  function getLayout(page: ReactElement) {
    return (
      <AppLayout
        permission={{
          moduleName: ['siem', 'core'],
          productName: products.cyber,
          policies: [
            permissions[
              'cyber:siem:notification-setting:create'
            ],
          ],
        }}
      >
        {page}
      </AppLayout>
    );
  };

export default NotificationSettingCreatePage;
