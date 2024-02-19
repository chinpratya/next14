import { Button, Form, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import {
  GroupInfo,
  useCreateGroup,
} from '@/features/admin';
import { useNotifications } from '@/stores/notifications';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

const GroupCreatePage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const createGroup = useCreateGroup({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.userGroup.create'
        ) as string,
      });
      router.back();
    },
  });

  const onCreate = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    createGroup.submit({
      ...values,
    });
  };

  return (
    <>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage id="admin.businessSetting.userGroup.create.title" />
        }
        overlap
        extra={
          <>
            <Button onClick={router.back}>
              <IntlMessage id="admin.businessSetting.userGroup.create.cancel" />
            </Button>
            <Button
              type="primary"
              onClick={onCreate}
              loading={createGroup.isLoading}
            >
              <IntlMessage id="admin.businessSetting.userGroup.create.save" />
            </Button>
          </>
        }
      />
      <Tabs
        items={[
          {
            key: 'basicInfo',
            label: (
              <IntlMessage id="admin.businessSetting.userGroup.create.basicInfo" />
            ),
            children: <GroupInfo form={form} />,
          },
        ]}
      />
    </>
  );
};

GroupCreatePage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default GroupCreatePage;
