import { Button, Form, Card } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import {
  PurposeCreateForm,
  useCreatePurpose,
} from '@/features/data-mapping';
import { useNotifications } from '@/stores/notifications';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

const CreatePurpose = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'dataMapping.notification.purpose.create'
      ) as string,
    });
    router.back();
    form.resetFields();
  };

  const createPurpose = useCreatePurpose({ onSuccess });
  const onSubmit = async () => {
    await form.validateFields();
    const isConsent = form.getFieldValue('isConsent');

    const payload = {
      ...form.getFieldsValue(),
      consentDetail: isConsent
        ? form.getFieldValue('consentDetail')
        : '',
    };

    createPurpose.submit(payload);
  };

  return (
    <>
      <PageHeader
        onBack={() => router.back()}
        title={
          <IntlMessage id="dataMapping.purpose.create.title" />
        }
        extra={
          <>
            <Button onClick={() => router.back()}>
              <IntlMessage id="dataMapping.purpose.create.cancel" />
            </Button>
            <Button
              type="primary"
              onClick={() => onSubmit()}
              loading={createPurpose.isLoading}
            >
              <IntlMessage id="dataMapping.purpose.create.save" />
            </Button>
          </>
        }
      />
      <Card
        title={
          <IntlMessage id="dataMapping.purpose.detail" />
        }
      >
        <PurposeCreateForm form={form} />
      </Card>
    </>
  );
};

CreatePurpose.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default CreatePurpose;
