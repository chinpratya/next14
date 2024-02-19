import { Button, Card, Col, Form, Row, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  OtherInformation,
  RolePermission,
  RoleInfo,
  useGetRole,
  useUpdateRole,
  useGetRolePermission,
  useUpdateRolePermission,
} from '@/features/admin';
import { AppLayout } from '@/layouts';
import { useNotifications } from '@/stores/notifications';
import { getColLayout } from '@/utils';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const RoleDetailPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const roleId = router.query.roleId as string;
  const { showNotification } = useNotifications();
  const { data, isLoading, isError } = useGetRole(roleId);

  const [permissionIds, setPermissionIds] = useState<
    string[]
  >([]);
  const permission = useGetRolePermission({
    roleId,
    onSuccess: (data) => setPermissionIds(data),
  });

  const updatePermission = useUpdateRolePermission({
    roleId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.role.permission.update'
        ) as string,
      });
    },
  });

  const updateRole = useUpdateRole({
    roleId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.role.update'
        ) as string,
      });
    },
  });

  const [activeTab, setActiveTab] =
    useState<string>('basic-info');

  const [form] = Form.useForm();

  if (isLoading) return <Loading cover="content" />;

  const handleSelectPermission = (
    permissionKeys: string[]
  ) => setPermissionIds(permissionKeys);

  const onUpdateRole = async () => {
    await form.validateFields();
    const values = await form.validateFields();
    updateRole.submit(values);
  };

  const onUpdatePermission = async () => {
    updatePermission.submit(permissionIds);
  };

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage id="admin.businessSetting.role.detail.title" />
        }
        subtitle={data?.name}
        onBack={router.back}
        extra={
          <>
            <Button onClick={() => router.back()}>
              <IntlMessage id="admin.businessSetting.role.cancel" />
            </Button>
            <Button
              loading={
                updateRole.isLoading ||
                updatePermission.isLoading
              }
              onClick={
                activeTab === 'basic-info'
                  ? onUpdateRole
                  : onUpdatePermission
              }
              type="primary"
            >
              <IntlMessage id="admin.businessSetting.role.save" />
            </Button>
          </>
        }
        overlap
      />
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        items={[
          {
            key: 'basic-info',
            label: (
              <IntlMessage id="admin.businessSetting.role.basicInfo" />
            ),
            children: (
              <>
                <OtherInformation
                  createdDate={data?.created_dt}
                  createdBy={data?.created_by}
                  lastUpdatedDate={data?.updated_dt}
                  lastUpdatedBy={data?.updated_by}
                />
                <Row>
                  <Col {...getColLayout(12)}>
                    <Card
                      title={
                        <IntlMessage id="admin.businessSetting.role.basicInfo" />
                      }
                    >
                      <RoleInfo data={data} form={form} />
                    </Card>
                  </Col>
                </Row>
              </>
            ),
          },
          {
            key: 'permission',
            label: (
              <IntlMessage id="admin.businessSetting.role.permission" />
            ),
            children: (
              <>
                <OtherInformation
                  createdDate={data?.created_dt}
                  createdBy={data?.created_by}
                  lastUpdatedDate={data?.updated_dt}
                  lastUpdatedBy={data?.updated_by}
                />
                <RolePermission
                  permissionIds={permissionIds}
                  onChange={handleSelectPermission}
                  isLoading={permission.isLoading}
                  isError={permission.isError}
                />
              </>
            ),
          },
        ]}
      />
    </FallbackError>
  );
};

RoleDetailPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default RoleDetailPage;
