import {
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

import { useColumnFiltered } from '@/hooks';
import { DropdownTable } from '@components/dropdown-table';
import { IntlMessage } from '@utilComponents/intl-message';

import { GroupRole } from '../../types';

export type GroupRolesTableProps = {
  rolesGroup?: GroupRole[];
  loading?: boolean;
  onDelete?: (roleGroup: GroupRole) => void;
  onCreate?: () => void;
  pagination?: React.ReactElement;
};

export const GroupRolesTable = ({
  rolesGroup,
  loading,
  onDelete,
  onCreate,
  pagination,
}: GroupRolesTableProps) => {
  const columns: ColumnsType<GroupRole> = [
    {
      title: (
        <IntlMessage id="admin.businessSetting.userGroup.detail.role.table.name" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.userGroup.detail.role.table.status" />
      ),
      dataIndex: 'status',
      key: 'status',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.userGroup.detail.role.table.description" />
      ),
      dataIndex: 'description',
      key: 'description',
      width: 300,
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (groupRole: GroupRole) => (
        <DropdownTable
          items={[
            {
              key: 'delete',
              label: 'Delete',
              icon: <DeleteOutlined />,
              onClick: () => onDelete?.(groupRole),
            },
          ]}
        />
      ),
    },
  ];

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      id: 'user-group-role',
      columns,
    });

  return (
    <Card
      title={
        <IntlMessage id="admin.businessSetting.userGroup.detail.role.title" />
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
            <IntlMessage id="admin.businessSetting.userGroup.detail.role.add" />
          </Button>
          {ColumnTransfer}
        </>
      }
    >
      <Table
        rowKey="roleId"
        columns={filteredColumns}
        loading={loading}
        dataSource={rolesGroup}
        pagination={false}
      />
      {pagination}
    </Card>
  );
};
