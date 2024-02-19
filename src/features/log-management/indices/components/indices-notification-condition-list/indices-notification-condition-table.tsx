import { EditOutlined } from '@ant-design/icons';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import { NoneProfile } from '@/components/share-components/none-profile';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { IntlMessage } from '@/components/util-components/intl-message';

import { Monitor, NotifyList } from '../../types';

type IndicesNotificationConditionTableProps = {
  dataSource?: Monitor[];
  loading: boolean;
  notifyList: NotifyList[];
  permissions: {
    isUpdate?: boolean;
    isDelete?: boolean;
  };
  onEdit?: (data: Monitor) => void;
  onDelete?: (data: Monitor) => void;
};

export const IndicesNotificationConditionTable = ({
  dataSource,
  loading,
  notifyList,
  permissions,
  onEdit,
  onDelete,
}: IndicesNotificationConditionTableProps) => {
  const convertMinutesToTime = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0 && minutes > 0)
      return (
        <IntlMessage
          id="logManagement.indices.timeNotification.hour"
          options={{ time: `${hours}:${minutes}` }}
        />
      );
    else if (hours > 0 && minutes < 1)
      return (
        <IntlMessage
          id="logManagement.indices.timeNotification.hour"
          options={{ time: hours }}
        />
      );
    else hours < 1 && minutes > 0;
    return (
      <IntlMessage
        id="logManagement.indices.timeNotification.minute"
        options={{ time: minutes }}
      />
    );
  };

  const columns: ColumnsType<Monitor> = [
    {
      title: (
        <IntlMessage id="logManagement.indices.notificationName" />
      ),
      key: 'name',
      width: 100,
      ellipsis: true,
      fixed: 'left',
      render: (data: Monitor) => (
        <Typography.Link onClick={() => onEdit?.(data)}>
          {!!data.hostname
            ? data.hostname
            : data.monitor_type}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="logManagement.indices.notificationGroup" />
      ),
      key: 'notification',
      width: 100,
      ellipsis: true,
      render: (data: Monitor) => (
        <Typography.Text>
          {data.notify
            ? notifyList.find(
                (item) => item.value === data.notify?.[0]
              )?.label ?? data.notify[0]
            : '-'}
        </Typography.Text>
      ),
    },
    {
      title: (
        <IntlMessage id="logManagement.indices.condition" />
      ),
      key: 'typeCondition',
      dataIndex: 'monitor_type',
      align: 'center',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="logManagement.indices.notificationTime" />
      ),
      key: 'everyTime',
      dataIndex: 'interval_time',
      align: 'center',
      width: 100,
      render: (time: number) =>
        convertMinutesToTime(time),
    },
    {
      title: (
        <IntlMessage id="logManagement.createdDate" />
      ),
      dataIndex: 'created_date',
      key: 'createdAt',
      align: 'center',
      width: 100,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: <IntlMessage id="logManagement.createdBy" />,
      dataIndex: 'created_by',
      key: 'createdBy',
      align: 'center',
      width: 80,
      render: (profile: string) => (
        <NoneProfile title={profile} />
      ),
    },
    {
      key: 'action',
      width: 50,
      fixed: 'right',
      render: (data: Monitor) => (
        <DropdownTable
          items={[
            {
              key: 'edit',
              label: (
                <IntlMessage id="logManagement.edit" />
              ),
              icon: <EditOutlined />,
              disabled: !permissions.isUpdate,
              onClick: () => onEdit?.(data),
            },
            // {
            //   key: 'delete',
            //   label: (
            //     <IntlMessage id="logManagement.delete" />
            //   ),
            //   icon: <DeleteOutlined />,
            //   onClick: () => {
            //     onDelete?.(data);
            //   },
            //   disabled:
            //     data.monitor_type.toLowerCase() ===
            //       'storage' || !permissions.isDelete,
            // },
          ]}
        />
      ),
    },
  ];

  return (
    <Table
      tableLayout="fixed"
      rowKey="_id"
      dataSource={dataSource ?? []}
      loading={loading}
      columns={columns}
      scroll={{ x: 1000 }}
      pagination={false}
    />
  );
};
