import { Button, Card, Form, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  DetailsOrganization,
  useCreateOrganizationManagement,
  useGetOrganizationManagement,
} from '@/features/admin';
import { AppLayout } from '@/layouts';
import { useNotifications } from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

export const CreateOrganizationManagementPage = () => {
  const router = useRouter();
  const underId = router.query.under as string;
  const { showNotification } = useNotifications();

  const [form] = Form.useForm();

  const { isLoading, isError } =
    useGetOrganizationManagement({
      organizationId: underId,
    });

  const createOrganization =
    useCreateOrganizationManagement({
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: 'Create organization success',
        });
        router.back();
      },
    });

  if (isLoading) {
    return <Loading cover="content" />;
  }

  const onCreate = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    createOrganization.submit({
      ...values,
      under_department: underId,
    });
  };

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage id="admin.businessSetting.organizationManagement.create.title" />
        }
        overlap
        extra={
          <>
            <Button onClick={() => router.back()}>
              <IntlMessage id="admin.businessSetting.organizationManagement.cancel" />
            </Button>
            <Button
              type="primary"
              onClick={onCreate}
              loading={createOrganization.isLoading}
            >
              <IntlMessage id="admin.businessSetting.organizationManagement.save" />
            </Button>
          </>
        }
      />
      <Tabs
        items={[
          {
            key: 'info',
            label: (
              <IntlMessage id="admin.businessSetting.organizationManagement.basicInfo" />
            ),
            children: (
              <Card
                title={
                  <IntlMessage id="admin.businessSetting.organizationManagement.basicInfo" />
                }
              >
                <DetailsOrganization
                  form={form}
                  type="management"
                />
              </Card>
            ),
          },
        ]}
      />
    </FallbackError>
  );
};

CreateOrganizationManagementPage.getLayout = (
  page: ReactNode
) => <AppLayout>{page}</AppLayout>;

export default CreateOrganizationManagementPage;
