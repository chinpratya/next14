import { Button, Form, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActivityDetail,
  ActivityForm,
  ActivityPreview,
  ActivityPurposeList,
  useUpdateActivity,
} from '@/features/consent-management';
import { useGetActivity } from '@/features/data-mapping';
import { PermissionWrapper } from '@/features/shared';
import { AppLayout } from '@/layouts';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const ActivityDetailPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();

  const [activeTab, setActiveTab] = useState('detail');

  const activityId = router.query.activityId as string;

  const { data, isLoading, isError } = useGetActivity({
    activityId,
  });

  const updateActivity = useUpdateActivity({
    activityId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'consentManagement.notification.activity.update'
        ) as string,
      });
    },
  });

  const onUpdateActivity = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    updateActivity.submit({
      ...data,
      ...values,
      subjectID: [''],
    });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  if (isLoading) {
    return <Loading cover="content" />;
  }

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage id="consentManagement.activity.activityDetail" />
        }
        subtitle={data?.name}
        extra={
          activeTab === 'detail' && (
            <PermissionWrapper
              moduleName={'consent'}
              policies={[
                permissions[
                  'pdpakit:consent:activity:update'
                ],
              ]}
            >
              <Button
                type="primary"
                loading={updateActivity.isLoading}
                onClick={onUpdateActivity}
              >
                <IntlMessage id="consentManagement.activity.activityDetail.save" />
              </Button>
            </PermissionWrapper>
          )
        }
        overlap
      />
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        items={[
          {
            key: 'detail',
            label: (
              <IntlMessage id="consentManagement.activity.activityDetail.detail" />
            ),
            children: (
              <>
                <ActivityDetail data={data} />
                <ActivityForm form={form} data={data} />
              </>
            ),
          },
          {
            key: 'purpose',
            label: (
              <IntlMessage id="consentManagement.activity.activityDetail.purpose" />
            ),
            children: (
              <ActivityPurposeList
                activityId={activityId}
              />
            ),
          },
          {
            key: 'preview',
            label: (
              <IntlMessage id="consentManagement.activity.activityDetail.preview" />
            ),
            children: (
              <ActivityPreview activityId={activityId} />
            ),
          },
        ]}
      />
    </FallbackError>
  );
};

ActivityDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default ActivityDetailPage;
