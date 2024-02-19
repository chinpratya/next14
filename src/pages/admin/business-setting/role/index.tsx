import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import {
  RoleList,
  Role,
  useDeleteRole,
} from '@/features/admin';
import { useToggle } from '@/hooks';
import { AppLayout } from '@/layouts';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const RolePage = () => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const router = useRouter();

  const toggle = useToggle<Role>();

  const deleteRole = useDeleteRole({
    onSuccess: () => {
      toggle.remove();
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.role.delete'
        ) as string,
      });
    },
  });

  const onCreateRole = () =>
    router.push(`${router.asPath}/create`);

  const onEditRole = (role: Role) =>
    router.push(`${router.asPath}/${role.roleId}`);

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="admin.businessSetting.role" />
        }
        extra={
          <Button
            type="primary"
            icon={<PlusCircleOutlined className="mr-1" />}
            onClick={onCreateRole}
          >
            <IntlMessage id="admin.businessSetting.role.create" />
          </Button>
        }
      />
      <RoleList
        onEdit={onEditRole}
        onDelete={(role) => toggle.remove(role)}
      />
      <DeleteModal
        title="Delete Record"
        content={`Are you sure want to delete this role: ${toggle.data?.name}, When you confirm this role will be deleted in all user`}
        open={toggle.openRemove}
        loading={deleteRole.isLoading}
        hasIdentifier={false}
        onDelete={() =>
          deleteRole.submit(toggle.data?.roleId)
        }
        onCancel={() => toggle.remove()}
      />
    </>
  );
};

RolePage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default RolePage;
