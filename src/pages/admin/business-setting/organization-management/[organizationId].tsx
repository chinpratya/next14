import { useToggle } from '@mantine/hooks';
import { Button, Card, Form, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  DetailsOrganization,
  OrganizationUserList,
  OrganizationUser,
  OtherInformation,
  useGetOrganizationManagement,
  useUpdateOrganizationManagement,
} from '@/features/admin';
import { useTab } from '@/hooks';
import { AppLayout } from '@/layouts';
import { useNotifications } from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

export const OrganizationDetailPage = () => {
  const [editable, toggleEditable] = useToggle();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const router = useRouter();
  const organizationId = router.query
    .organizationId as string;

  const tab = useTab({
    initialTab: 'info',
  });

  const { data, isLoading, isError } =
    useGetOrganizationManagement({
      organizationId,
    });

  const updateOrganization =
    useUpdateOrganizationManagement({
      organizationId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: 'Update organization success',
        });
      },
    });

  const onEditUser = (user: OrganizationUser) => {
    router.push(
      `/admin/user-management/user/${user.userId}`
    );
  };

  if (isLoading) {
    return <Loading cover="content" />;
  }

  const onUpdate = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    await updateOrganization.submit({
      ...data,
      ...values,
    });
  };

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage id="admin.businessSetting.organizationManagement.detail.title" />
        }
        subtitle={data?.department_name}
        onBack={router.back}
        overlap
      />
      <Tabs
        activeKey={tab.currentTab}
        onChange={tab.onChange}
        items={[
          {
            key: 'info',
            label: (
              <IntlMessage id="admin.businessSetting.organizationManagement.basicInfo" />
            ),
            children: (
              <>
                <OtherInformation
                  createdDate={data?.created_dt}
                  createdBy={data?.created_by}
                  lastUpdatedDate={data?.updated_dt}
                  lastUpdatedBy={data?.updated_by}
                />
                <Card
                  title={
                    <IntlMessage id="admin.businessSetting.organizationManagement.basicInfo" />
                  }
                  extra={
                    editable ? (
                      <>
                        <Button
                          className="mr-2"
                          onClick={() => toggleEditable()}
                        >
                          <IntlMessage id="admin.businessSetting.organizationManagement.cancel" />
                        </Button>
                        <Button
                          type="primary"
                          loading={
                            updateOrganization.isLoading
                          }
                          onClick={() => onUpdate()}
                        >
                          <IntlMessage id="admin.businessSetting.organizationManagement.save" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          type="primary"
                          onClick={() => toggleEditable()}
                        >
                          <IntlMessage id="admin.businessSetting.organizationManagement.edit" />
                        </Button>
                      </>
                    )
                  }
                >
                  <DetailsOrganization
                    disabled={!editable}
                    form={form}
                    data={data}
                    mode="edit"
                    type="management"
                  />
                </Card>
              </>
            ),
          },
          {
            key: 'user',
            label: (
              <IntlMessage id="admin.businessSetting.organizationManagement.user" />
            ),
            children: (
              <OrganizationUserList
                organizationId={organizationId}
                onEdit={onEditUser}
              />
            ),
          },
        ]}
      />
    </FallbackError>
  );
};

OrganizationDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default OrganizationDetailPage;
