import { css } from '@emotion/css';
import { Button, Form, Card } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Loading } from '@/components/share-components/loading';
import {
  JobTitleFormInfo,
  useGetJobTitle,
  useUpdateJobTitle,
  OtherInformation,
} from '@/features/admin';
import { useNotifications } from '@/stores/notifications';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const EditPositionPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotifications();
  const positionId = router.query.positionId as string;

  const { data, isLoading, isError } =
    useGetJobTitle(positionId);

  const [form] = Form.useForm();

  const onUpdateSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'admin.notification.jobTitle.update'
      ) as string,
    });
  };

  const update = useUpdateJobTitle({
    positionId,
    onSuccess: onUpdateSuccess,
  });

  const onEditPosition = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    update.submit({ positionId, data: values });
  };

  useEffect(() => {
    if (data) form.setFieldsValue(data);
  }, [form, data]);

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
          <IntlMessage id="admin.userManagement.jobTitle.detail.title" />
        }
        onBack={router.back}
        subtitle={`${data?.name}`}
        extra={
          <>
            <Button onClick={router.back}>
              <IntlMessage id="admin.userManagement.jobTitle.detail.cancel" />
            </Button>
            <Button
              type="primary"
              onClick={onEditPosition}
              loading={update.isLoading}
            >
              <IntlMessage id="admin.userManagement.jobTitle.detail.save" />
            </Button>
          </>
        }
      />
      <OtherInformation
        createdBy={data?.created_by ?? ''}
        createdDate={data?.updated_dt ?? ''}
        lastUpdatedBy={data?.updated_by ?? ''}
        lastUpdatedDate={data?.updated_dt ?? ''}
      />
      <Card
        className={css`
          width: 45%;
          @media only screen and (max-width: 900px) {
            width: 100%;
          }
        `}
      >
        <JobTitleFormInfo form={form} />
      </Card>
    </FallbackError>
  );
};

EditPositionPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default EditPositionPage;
