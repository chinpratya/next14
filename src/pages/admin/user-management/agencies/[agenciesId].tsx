import { Button, Card, Form } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Loading } from '@/components/share-components/loading';
import {
  AgenciesForm,
  OtherInformation,
  useGetAgencies,
  useUpdateAgencies,
} from '@/features/admin';
import { useNotifications } from '@/stores/notifications';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const AgenciesDetailPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotifications();
  const [form] = Form.useForm();
  const agenciesId = router.query.agenciesId as string;

  const { data, isError, isLoading } =
    useGetAgencies(agenciesId);

  const update = useUpdateAgencies({
    groupID: agenciesId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.agencies.update'
        ) as string,
      });
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const onUpdate = () => {
    update.submit(form.getFieldsValue());
  };

  if (isLoading) {
    return (
      <>
        <Loading cover="content" />
      </>
    );
  }

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage id="admin.userManagement.agencies.detail.title" />
        }
        onBack={router.back}
        extra={
          <>
            <Button onClick={router.back}>
              <IntlMessage id="admin.userManagement.jobTitle.detail.cancel" />
            </Button>
            <Button type="primary" onClick={onUpdate}>
              <IntlMessage id="admin.userManagement.jobTitle.detail.save" />
            </Button>
          </>
        }
      />

      <OtherInformation
        createdBy={data?.created_by}
        createdDate={data?.created_dt}
        lastUpdatedBy={data?.updated_by}
        lastUpdatedDate={data?.updated_dt}
      />
      <Card style={{ width: '40%' }}>
        <AgenciesForm form={form} />
      </Card>
    </FallbackError>
  );
};

AgenciesDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default AgenciesDetailPage;
