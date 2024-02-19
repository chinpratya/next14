import { DeleteOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { useToggle } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteRoleUser } from '../../api/delete-role-user';
import { UserRole } from '../../types';

type UserDetailRoleTableProps = {
  dataSource: UserRole[];
  isLoading: boolean;
  userId: string;
};

export const UserDetailRoleTable = ({
  dataSource,
  isLoading,
  userId,
}: UserDetailRoleTableProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const toggle = useToggle();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'admin.notification.user.role.delete'
      ) as string,
    });
  };

  const { submit, isLoading: loadingDelete } =
    useDeleteRoleUser({
      onSuccess: onSuccess,
      userId,
      onClose: () => toggle.remove(),
    });

  const columns: ColumnsType<UserRole> = [
    {
      title: (
        <IntlMessage id="admin.userManagement.user.detail.role.table.Id" />
      ),
      dataIndex: 'roleId',
      key: 'roleId',
      width: 250,
    },
    {
      title: (
        <IntlMessage id="admin.userManagement.user.detail.role.table.name" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 250,
    },

    {
      title: (
        <IntlMessage id="admin.userManagement.user.detail.role.table.description" />
      ),
      dataIndex: 'description',
      key: 'description',
      width: 250,
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (data: UserRole) => (
        <DropdownTable
          items={[
            {
              key: 'delete',
              label: (
                <IntlMessage id="admin.userManagement.user.detail.basicInfo.delete" />
              ),
              icon: <DeleteOutlined />,
              onClick: () => {
                toggle.remove(data);
              },
            },
          ]}
        />
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        tableLayout="fixed"
        scroll={{ x: 800 }}
        pagination={false}
      />
      <DeleteModal
        loading={loadingDelete}
        open={toggle.openRemove}
        identifier={toggle?.data?.name}
        onDelete={() =>
          submit({
            userId,
            roleId: _.get(toggle.data, 'roleId') ?? '',
          })
        }
        onCancel={() => toggle.remove()}
      />
    </>
  );
};
