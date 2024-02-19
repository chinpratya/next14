import { Button, Form } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import {
  UserDetailForm,
  useCreateUser,
} from '@/features/admin';
import {
  useNotifications,
  ValidateFailedNotificationError,
} from '@/stores/notifications';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

const CreateUserPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    showNotification,
    showValidateFailedNotification,
  } = useNotifications();

  const onSuccess = (userId: string) => {
    showNotification({
      type: 'success',
      message: t(
        'admin.notification.user.create'
      ) as string,
    });
    router.replace(
      `/admin/user-management/user/${userId}?isRedirect=true`
    );
  };
  const createUser = useCreateUser({ onSuccess });
  const [form] = Form.useForm();

  const onCreateUser = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      if (values.access_end_date === undefined) {
        values.access_end_date = '';
      }
      if (values.profile_pic === undefined) {
        values.profile_pic = '';
      }
      createUser.submit(form.getFieldsValue());
    } catch (error) {
      showValidateFailedNotification(
        error as ValidateFailedNotificationError
      );
    }
  };

  return (
    <>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage id="admin.userManagement.user.create.title" />
        }
        extra={
          <>
            <Button onClick={router.back}>
              {' '}
              <IntlMessage id="admin.userManagement.user.create.cancel" />
            </Button>
            <Button
              type="primary"
              onClick={onCreateUser}
              loading={createUser.isLoading}
            >
              <IntlMessage id="admin.userManagement.user.create.save" />
            </Button>
          </>
        }
      />
      <UserDetailForm
        form={form}
        showOrg={false}
        showStatus={false}
        isCreate={true}
      />
    </>
  );
};

CreateUserPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default CreateUserPage;
