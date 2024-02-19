import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { ShowTagStatus } from '@/components/share-components/show-tag-status';
import { IntlMessage } from '@/components/util-components/intl-message';
import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';

import { ReportScheduler } from '../../types';

type ReportSchedulerTableProps = {
  loading?: boolean;
  dataSource?: ReportScheduler[];
  onEdit?: (scheduler: ReportScheduler) => void;
  onDelete?: (scheduler: ReportScheduler) => void;
};

export const ReportSchedulerTable = ({
  loading,
  dataSource,
  onEdit,
  onDelete,
}: ReportSchedulerTableProps) => {
  const editPermission = usePermission({
    moduleName: 'siem',
    policies: [permissions['cyber:siem:report:update']],
  });

  const deletePermission = usePermission({
    moduleName: 'siem',
    policies: [permissions['cyber:siem:report:delete']],
  });

  const columns: ColumnsType<ReportScheduler> = [
    {
      title: (
        <IntlMessage id="logManagement.report.scheduler.schedulerName" />
      ),
      key: 'name',
      render: (scheduler: ReportScheduler) => (
        <Typography.Link
          onClick={() => onEdit?.(scheduler)}
        >
          {scheduler.name}
        </Typography.Link>
      ),
    },
    // {
    //   title: (
    //     <IntlMessage id="logManagement.organization" />
    //   ),
    //   dataIndex: 'organization',
    //   key: 'indices',
    //   ellipsis: true,
    // },
    {
      title: (
        <IntlMessage id="logManagement.report.scheduler.frequency" />
      ),
      dataIndex: 'every',
      key: 'frequency',
      // width: 120,
      render: (value: string) => (
        <IntlMessage
          id={`logManagement.report.scheduler.${value.toLowerCase()}`}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="logManagement.createdDate" />
      ),
      key: 'schedulerOn',
      dataIndex: 'created_date',
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="logManagement.report.scheduler.status" />
      ),
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: string) => (
        <ShowTagStatus
          items={[
            {
              label: 'logManagement.inactive',
              key: 'INACTIVE',
              color: '#FF6B72',
            },
            {
              label: 'logManagement.active',
              key: 'ACTIVE',
              color: '#04D182',
            },
          ]}
          status={status}
        />
      ),
    },
    {
      key: 'action',
      width: 50,
      render: (scheduler: ReportScheduler) => (
        <DropdownTable
          items={[
            {
              key: 'edit',
              icon: <EditOutlined />,
              label: (
                <IntlMessage id="logManagement.edit" />
              ),
              disabled: !editPermission.isAllow,
              onClick: () => onEdit?.(scheduler),
            },
            {
              key: 'delete',
              label: (
                <IntlMessage id="logManagement.delete" />
              ),
              icon: <DeleteOutlined />,
              disabled: !deletePermission.isAllow,
              onClick: () => onDelete?.(scheduler),
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
      scroll={{ x: 740 }}
      loading={loading}
      pagination={false}
    />
  );
};
