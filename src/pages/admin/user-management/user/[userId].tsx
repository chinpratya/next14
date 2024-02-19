import { Button, Form, Tabs } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Loading } from '@/components/share-components/loading';
import {
  UserDetailForm,
  useGetUseDetail,
  useUpdateUser,
  UserDetailRole,
  UserDetailGroup,
} from '@/features/admin';
import { useNotifications } from '@/stores/notifications';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const EditUserPage = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const router = useRouter();

  const userId = router.query.userId as string;
  const { data, isError, isLoading } =
    useGetUseDetail(userId);

  const items = [
    {
      key: 'info',
      label: (
        <IntlMessage id="admin.userManagement.user.detail.basicInfo" />
      ),
      children: (
        <FallbackError isError={isError}>
          <UserDetailForm
            form={form}
            showOrg={true}
            profile={data?.profile_pic ?? ''}
            isLoading={isLoading}
            userId={userId}
            showStatus={true}
          />
        </FallbackError>
      ),
    },
    {
      key: 'Roles',
      label: (
        <IntlMessage id="admin.userManagement.user.detail.role" />
      ),
      children: <UserDetailRole />,
    },
    {
      key: 'User Groups',
      label: (
        <IntlMessage id="admin.userManagement.user.detail.group" />
      ),
      children: <UserDetailGroup />,
    },
  ];

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'admin.notification.user.update'
      ) as string,
    });
  };

  const upDateUser = useUpdateUser({ userId, onSuccess });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        phone_prefix: data?.phone_prefix ?? '+66',
        access_start_date: dayjs(
          data?.access_start_date as string
        ),
        access_end_date: data?.access_end_date
          ? dayjs(data?.access_end_date)
          : '',
      });
    }
  }, [data, form]);

  const onEditUser = async () => {
    await form.validateFields();
    if (!form.getFieldValue('access_end_date')) {
      form.setFieldValue('access_end_date', '');
    }
    upDateUser.submit(form.getFieldsValue());
  };

  const checkRedirect = () => {
    router?.query?.isRedirect
      ? router.replace('/admin/user-management/user')
      : router.back();
  };

  if (isLoading) {
    return <Loading cover="content" />;
  }
  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={checkRedirect}
        title={
          <IntlMessage id="admin.userManagement.user.detail.title" />
        }
        extra={
          <>
            <Button onClick={checkRedirect}>
              <IntlMessage id="admin.userManagement.user.detail.cancel" />
            </Button>
            <Button
              type="primary"
              onClick={onEditUser}
              loading={upDateUser.isLoading}
            >
              <IntlMessage id="admin.userManagement.user.detail.save" />
            </Button>
          </>
        }
        overlap
      />
      <Tabs items={items} />
    </FallbackError>
  );
};

EditUserPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default EditUserPage;
