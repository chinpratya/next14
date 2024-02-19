import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import {
  useFilter,
  usePagination,
  useRowSelection,
} from '@/hooks';
import { tokens } from '@/lang';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListUser } from '../../api/list-user';
import type { User } from '../../types';

export type UserTableSelectProps = {
  selectedRowKeys?: string[];
  disabledRowKeys?: string[];
  onSelect?: (selectedRowKeys: string[]) => void;
};

export const UserTableSelect = ({
  selectedRowKeys,
  disabledRowKeys,
  onSelect,
}: UserTableSelectProps) => {
  const { filters, columnFilter, filterDropdown } =
    useFilter<User>();

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { rowSelection } = useRowSelection({
    selectedRowKeys,
    onSelect,
    disabledRowKeys,
    disabledKey: 'userId',
  });

  const { data, isLoading, isError } = useListUser({
    // ...filters,
    search: filters.search as string,
    page,
    pageSize,
  });

  const columns: ColumnsType<User> = [
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.responsePlan.name}
        />
      ),
      key: 'name',
      width: 100,
      ellipsis: true,
      ...columnFilter('search'),
      filterDropdown: filterDropdown('search', 'search'),
      render: ({ first_name, last_name }: User) =>
        `${first_name} ${last_name}`,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.responsePlan.email}
        />
      ),
      key: 'email',
      dataIndex: 'email',
      width: 100,
      ellipsis: true,
      ...columnFilter('search'),
      filterDropdown: filterDropdown('search', 'search'),
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.responsePlan.organization}
        />
      ),
      dataIndex: 'organization_labels',
      key: 'department',
      width: 100,
      ellipsis: true,
      ...columnFilter('search'),
      filterDropdown: filterDropdown('search', 'search'),
    },
  ];

  return (
    <FallbackError isError={isError}>
      <Table
        tableLayout="fixed"
        scroll={{ x: 300 }}
        rowKey="userId"
        columns={columns}
        loading={isLoading}
        dataSource={data?.data}
        pagination={false}
        rowSelection={rowSelection}
      />
      <Pagination
        total={data?.totalRecord}
        current={page}
        pageSize={pageSize}
        onChange={onPaginationChange}
      />
    </FallbackError>
  );
};
