import { Button, Form } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  GroupForm,
  useCreateGroup,
} from '@/features/data-mapping';
import { AppLayout } from '@/layouts';
import { useNotifications } from '@/stores/notifications';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const GroupCreatePage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const { submit, isLoading } = useCreateGroup({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.group.create'
        ) as string,
      });
      router.back();
    },
  });

  const handlerCreateGroup = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    submit(values);
  };

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dataMapping.group.create.title" />
        }
        onBack={() => router.back()}
        extra={
          <>
            <Button onClick={router.back}>
              <IntlMessage id="dataMapping.group.cancel" />
            </Button>
            <Button
              type="primary"
              onClick={handlerCreateGroup}
              loading={isLoading}
            >
              <IntlMessage id="dataMapping.group.save" />
            </Button>
          </>
        }
      />
      <GroupForm form={form} />
    </>
  );
};

GroupCreatePage.getLayout = (page: React.ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default GroupCreatePage;
