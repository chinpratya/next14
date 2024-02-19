import { Button, Form } from 'antd';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

import { Loading } from '@/components/share-components/loading';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import {
  NotificationSettingInfo,
  useGetNotify,
  useUpdateNotify,
} from '@/features/log-management';
import { PermissionWrapper } from '@/features/shared';
import { permissions, products } from '@/permissions';
import { logManagementModules } from '@/permissions/log-management';
import { useNotifications } from '@/stores/notifications';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const { lm, core } = logManagementModules;

const NotificationSettingDetailPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const notifyId = router.query.notifyId as string;
  const notify = useGetNotify(notifyId);

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'logManagement.notification.updated'
      ) as string,
    });
  };

  const { submit, isLoading } = useUpdateNotify({
    notifyId,
    onSuccess,
  });

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    const payload = {
      ...values,
      module: 'LM',
      config_default: !values.custom_config,
    };
    delete payload.custom_config;
    submit(payload);
  };

  useEffect(() => {
    if (notify.data)
      form.setFieldsValue({
        ...notify.data,
        custom_config:
          !notify.data.config_default ?? false,
      });
  }, [form, notify.data]);

  if (notify.isLoading)
    return <Loading cover="content" />;

  return (
    <FallbackError isError={notify.isError}>
      <PageHeader
        title={
          <IntlMessage id="logManagement.notificationSetting.title" />
        }
        subtitle={notify.data?.name}
        onBack={router.back}
        extra={
          <PermissionWrapper
            moduleName="lm"
            policies={[
              permissions[
                'cyber:lm:notification-setting:update'
              ],
            ]}
          >
            <Button
              type="primary"
              onClick={onSubmit}
              loading={isLoading}
            >
              <IntlMessage id="logManagement.update" />
            </Button>
          </PermissionWrapper>
        }
      />
      <NotificationSettingInfo
        form={form}
        provider={notify.data?.provider as string}
      />
    </FallbackError>
  );
};

NotificationSettingDetailPage.getLayout =
  function getLayout(page: ReactElement) {
    return (
      <AppLayout
        permission={{
          moduleName: [lm, core],
          productName: products.cyber,
          policies: [
            permissions[
              'cyber:lm:notification-setting:read'
            ],
          ],
        }}
      >
        {page}
      </AppLayout>
    );
  };

export default NotificationSettingDetailPage;
