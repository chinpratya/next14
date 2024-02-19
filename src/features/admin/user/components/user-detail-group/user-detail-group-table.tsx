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

import { useDeleteGroupUser } from '../../api/delete-group-user';
import { UserGroup } from '../../types';

type UserDetailGroupTableProps = {
  dataSource: UserGroup[];
  isLoading: boolean;
  userId: string;
  // onSuccess: () => void;
};

export const UserDetailGroupTable = ({
  dataSource,
  isLoading,
  userId,
}: UserDetailGroupTableProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const toggle = useToggle();

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'admin.notification.user.group.delete'
      ) as string,
    });
  };

  const { submit, isLoading: loadingDelete } =
    useDeleteGroupUser({
      onSuccess: onSuccess,
      userId,
      onClose: () => toggle.remove(),
    });

  const columns: ColumnsType<UserGroup> = [
    {
      title: (
        <IntlMessage id="admin.userManagement.user.detail.group.table.Id" />
      ),
      dataIndex: 'groupId',
      key: 'groupId',
      width: 250,
    },
    {
      title: (
        <IntlMessage id="admin.userManagement.user.detail.group.table.name" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 250,
    },

    {
      title: (
        <IntlMessage id="admin.userManagement.user.detail.group.table.description" />
      ),
      dataIndex: 'description',
      key: 'description',
      width: 250,
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (data: UserGroup) => (
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
        identifier={toggle.data?.name}
        onDelete={() =>
          submit({
            userId,
            groupId: _.get(toggle.data, 'groupId') ?? '',
          })
        }
        onCancel={() => toggle.remove()}
      />
    </>
  );
};
