import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Card, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import {
  useColumnFiltered,
  usePagination,
  useSearch,
} from '@/hooks';
import { DropdownTable } from '@components/dropdown-table';
import { InputSearch } from '@components/input-search';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListRole } from '../../api/list-role';
import { Role } from '../../types';

export interface ListRoleProps {
  onEdit?: (role: Role) => void;
  onDelete?: (role: Role) => void;
}

export const RoleList = ({
  onEdit,
  onDelete,
}: ListRoleProps) => {
  const { debouncedSearch, onSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { data, isLoading, isError } = useListRole({
    search: debouncedSearch,
    page,
    pageSize,
  });

  const columns: ColumnsType<Role> = [
    {
      title: (
        <IntlMessage id="admin.businessSetting.role.table.name" />
      ),
      key: 'name',
      width: 350,
      render: (role) => (
        <Typography.Link onClick={() => onEdit?.(role)}>
          {role.name}
        </Typography.Link>
      ),
    },

    {
      title: (
        <IntlMessage id="admin.businessSetting.role.table.description" />
      ),
      key: 'description',
      dataIndex: 'description',
      width: 500,
    },
    {
      key: 'action',
      width: 50,
      align: 'right',
      render: (role) => (
        <DropdownTable
          items={[
            {
              label: 'Edit',
              key: 'edit',
              icon: <EditOutlined />,
              onClick: () => onEdit?.(role),
            },
            {
              label: 'Delete',
              key: 'delete',
              icon: <DeleteOutlined />,
              onClick: () => onDelete?.(role),
            },
          ]}
        />
      ),
    },
  ];

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });

  return (
    <FallbackError isError={isError}>
      <Card
        extra={
          <>
            <InputSearch
              onSearch={onSearch}
              className="mr-2"
            />
            {ColumnTransfer}
          </>
        }
      >
        <Table
          rowKey="roleId"
          tableLayout="fixed"
          scroll={{
            x: 1050,
          }}
          loading={isLoading}
          columns={filteredColumns}
          dataSource={data?.data}
          pagination={false}
        />
        <Pagination
          current={page}
          pageSize={pageSize}
          total={data?.totalRecord}
          onChange={onPaginationChange}
        />
      </Card>
    </FallbackError>
  );
};
