import { useToggle } from '@mantine/hooks';
import { Button, Card, Form } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { getOrganizationManagement } from '@/features/admin';
import {
  AssetForm,
  useCreateAsset,
} from '@/features/data-mapping';
import { AppLayout } from '@/layouts';
import { useNotifications } from '@/stores/notifications';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const AssetCreatePage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, toggleLoading] = useToggle();
  const { showNotification } = useNotifications();

  const { submit, isLoading } = useCreateAsset({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.asset.create.success'
        ) as string,
      });
      router.back();
    },
  });

  const onSubmit = async () => {
    try {
      toggleLoading(true);
      await form.validateFields();
      const values = form.getFieldsValue();

      if (values.organizationType === 'internal') {
        const organization =
          await getOrganizationManagement(
            values.organizationID
          );
        values.organizationName =
          organization.department_name;
      }
      toggleLoading(false);
      submit(values);
    } catch (error) {
      toggleLoading(false);
      showNotification({
        type: 'error',
        message: t(
          'dataMapping.notification.asset.create.error'
        ) as string,
      });
    }
  };

  return (
    <>
      <PageHeader
        onBack={() => router.back()}
        title={
          <IntlMessage id="dataMapping.asset.create.title" />
        }
        extra={
          <>
            <Button onClick={() => router.back()}>
              <IntlMessage id="dataMapping.asset.cancel" />
            </Button>
            <Button
              type="primary"
              onClick={onSubmit}
              loading={loading || isLoading}
            >
              {' '}
              <IntlMessage id="dataMapping.asset.save" />
            </Button>
          </>
        }
      />

      <Card
        title={
          <IntlMessage id="dataMapping.asset.detail.title" />
        }
      >
        <AssetForm form={form} />
      </Card>
    </>
  );
};

AssetCreatePage.getLayout = (page: React.ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default AssetCreatePage;
