import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import { NoneProfile } from '@/components/share-components/none-profile';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { IntlMessage } from '@/components/util-components/intl-message';
import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';

import { Notify } from '../../types';

type NotificationSettingTableProps = {
  dataSource?: Notify[];
  loading: boolean;
  onEdit?: (notifyId: string) => void;
  onDuplicate?: (data: Notify) => void;
  onDelete?: (data: Notify) => void;
};

export const NotificationSettingTable = ({
  dataSource,
  loading,
  onEdit,
  onDelete,
  onDuplicate,
}: NotificationSettingTableProps) => {
  const moduleName = 'lm';

  const createPermission = usePermission({
    moduleName,
    policies: [
      permissions['cyber:lm:notification-setting:create'],
    ],
  });

  const editPermission = usePermission({
    moduleName,
    policies: [
      permissions['cyber:lm:notification-setting:update'],
    ],
  });

  const deletePermission = usePermission({
    moduleName,
    policies: [
      permissions['cyber:lm:notification-setting:delete'],
    ],
  });

  const columns: ColumnsType<Notify> = [
    {
      key: 'name',
      title: (
        <IntlMessage id="logManagement.notificationSetting.name" />
      ),
      width: 150,
      render: (data: Notify) => (
        <Typography.Link
          onClick={() => onEdit?.(data._id)}
        >
          {data.name}
        </Typography.Link>
      ),
    },
    {
      key: 'type',
      title: (
        <IntlMessage id="logManagement.notificationSetting.type" />
      ),
      dataIndex: 'provider',
      width: 70,
      render: (provider: string) => (
        <IntlMessage
          id={`logManagement.${provider.toLowerCase()}`}
        />
      ),
    },
    {
      key: 'createdDate',
      title: (
        <IntlMessage id="logManagement.createdDate" />
      ),
      dataIndex: 'created_date',
      align: 'center',
      width: 100,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      key: 'createdBy',
      title: <IntlMessage id="logManagement.createdBy" />,
      align: 'center',
      width: 100,
      render: (data: Notify) => (
        <NoneProfile title={data.created_by} />
      ),
    },
    {
      key: 'action',
      width: 50,
      render: (data: Notify) => (
        <DropdownTable
          items={[
            {
              key: 'edit',
              label: (
                <IntlMessage id="logManagement.edit" />
              ),
              icon: <EditOutlined />,
              disabled: !editPermission.isAllow,
              onClick: () => onEdit?.(data._id),
            },
            {
              key: 'duplicate',
              label: (
                <IntlMessage id="logManagement.duplicate" />
              ),
              icon: <CopyOutlined />,
              disabled:
                data.provider === 'DEFAULT' ||
                !createPermission.isAllow,
              onClick: () => onDuplicate?.(data),
            },
            {
              key: 'delete',
              label: (
                <IntlMessage id="logManagement.delete" />
              ),
              icon: <DeleteOutlined />,
              disabled:
                data.provider === 'DEFAULT' ||
                !deletePermission.isAllow,
              onClick: () => onDelete?.(data),
            },
          ]}
        />
      ),
    },
  ];
  return (
    <Table
      rowKey="_id"
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      pagination={false}
    />
  );
};
