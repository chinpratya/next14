import { Button, Form, Tabs } from 'antd';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import {
  GroupInfo,
  GroupRoles,
  GroupUsers,
  OtherInformation,
  useGetGroup,
  useUpdateGroup,
} from '@/features/admin';
import { AppLayout } from '@/layouts';
import { useNotifications } from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const GroupDetailPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const groupId = router.query.groupId as string;
  const { showNotification } = useNotifications();

  const { data, isLoading, isError } =
    useGetGroup(groupId);

  const updateGroup = useUpdateGroup({
    groupId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.userGroup.update'
        ) as string,
      });
    },
  });

  const onUpdateGroup = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      updateGroup.submit(values);
    } catch (error) {
      const message = _.get(
        error,
        'errorFields[0].errors[0]',
        'Please check your input again.'
      );
      console.log(error);
      showNotification({
        type: 'error',
        message,
      });
    }
  };

  if (isLoading) {
    return <Loading cover="content" />;
  }

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage id="admin.businessSetting.userGroup.detail.title" />
        }
        subtitle={data?.name}
        overlap
        extra={
          <>
            <Button onClick={router.back}>
              <IntlMessage id="admin.businessSetting.userGroup.detail.cancel" />
            </Button>
            <Button
              loading={updateGroup.isLoading}
              onClick={onUpdateGroup}
              type="primary"
            >
              <IntlMessage id="admin.businessSetting.userGroup.detail.save" />
            </Button>
          </>
        }
      />
      <Tabs
        items={[
          {
            key: 'basicInfo',
            label: (
              <IntlMessage id="admin.businessSetting.userGroup.detail.basicInfo" />
            ),
            children: (
              <>
                <OtherInformation
                  createdDate={data?.created_dt}
                  createdBy={data?.created_by}
                  lastUpdatedDate={data?.updated_dt}
                  lastUpdatedBy={data?.updated_by}
                />
                <GroupInfo form={form} group={data} />
              </>
            ),
          },
          {
            key: 'roles',
            label: (
              <IntlMessage id="admin.businessSetting.userGroup.detail.role" />
            ),
            children: (
              <>
                <OtherInformation
                  createdDate={data?.created_dt}
                  createdBy={data?.created_by}
                  lastUpdatedDate={data?.updated_dt}
                  lastUpdatedBy={data?.updated_by}
                />
                <GroupRoles groupId={groupId} />
              </>
            ),
          },
          {
            key: 'users',
            label: (
              <IntlMessage id="admin.businessSetting.userGroup.detail.user" />
            ),
            children: (
              <>
                <OtherInformation
                  createdDate={data?.created_dt}
                  createdBy={data?.created_by}
                  lastUpdatedDate={data?.updated_dt}
                  lastUpdatedBy={data?.updated_by}
                />
                <GroupUsers groupId={groupId} />
              </>
            ),
          },
        ]}
      />
    </FallbackError>
  );
};

GroupDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default GroupDetailPage;
