import {
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Card, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

import { useColumnFiltered } from '@/hooks';
import { DropdownTable } from '@components/dropdown-table';
import { ShowTagStatus } from '@components/show-tag-status';
import { TagTooltipListChild } from '@components/tag-tooltip-list-child';
import { IntlMessage } from '@utilComponents/intl-message';

import { GroupUser } from '../../types';

export type GroupUsersTableProps = {
  dataSource?: GroupUser[];
  isLoading?: boolean;
  onDelete?: (GroupUser: GroupUser) => void;
  onCreate?: () => void;
  pagination?: React.ReactElement;
};

export const GroupUsersTable = ({
  dataSource,
  isLoading,
  onDelete,
  onCreate,
  pagination,
}: GroupUsersTableProps) => {
  const statusItems = [
    {
      label: 'Active',
      key: 'active',
      color: '#04D182',
    },
    {
      label: 'Inactive',
      key: 'inactive',
      color: '#FF4B4B',
    },
  ];

  const columnDetails: ColumnsType<GroupUser> = [
    {
      title: (
        <IntlMessage id="admin.businessSetting.userGroup.detail.user.table.name" />
      ),
      key: 'name',
      width: 300,
      render: (user: GroupUser) => (
        <Typography>
          {user.first_name} {user.last_name}
        </Typography>
      ),
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.userGroup.detail.user.table.email" />
      ),
      key: 'email',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.userGroup.detail.user.table.organization" />
      ),
      key: 'organization_labels',
      dataIndex: 'organization_labels',
      width: 200,
      render: (organization_labels: string[]) => (
        <TagTooltipListChild list={organization_labels} />
      ),
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.userGroup.detail.user.table.employeeClassification" />
      ),
      key: 'employee_classification',
      dataIndex: 'employee_classification',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.userGroup.detail.user.table.status" />
      ),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: boolean) => (
        <ShowTagStatus
          status={`${status}`}
          items={statusItems}
        />
      ),
    },
  ];

  const columnAction: ColumnsType<GroupUser> = [
    {
      key: 'action',
      align: 'center',
      width: 50,
      render: (user: GroupUser) => (
        <DropdownTable
          items={[
            {
              key: 'delete',
              label: 'Delete',
              onClick: () => onDelete?.(user),
              icon: <DeleteOutlined />,
            },
          ]}
        />
      ),
    },
  ];

  const columns = onDelete
    ? [...columnDetails, ...columnAction]
    : columnDetails;

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      id: 'user-group-user',
      columns,
    });

  return (
    <Card
      title={
        <IntlMessage id="admin.businessSetting.userGroup.detail.user.title" />
      }
      extra={
        <>
          <Button
            className="mr-2"
            type="primary"
            ghost
            icon={<PlusCircleOutlined className="mr-1" />}
            onClick={onCreate}
          >
            <IntlMessage id="admin.businessSetting.userGroup.detail.user.add" />
          </Button>
          {ColumnTransfer}
        </>
      }
    >
      <Table
        rowKey="userId"
        tableLayout="fixed"
        scroll={{
          x: 1000,
        }}
        loading={isLoading}
        columns={filteredColumns}
        dataSource={dataSource}
        pagination={false}
      />
      {pagination}
    </Card>
  );
};
