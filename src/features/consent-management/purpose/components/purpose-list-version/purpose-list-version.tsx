import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import {
  usePagination,
  useColumnFiltered,
} from '@/hooks';
import { ShowTagDate } from '@components/show-tag-date';
// import { FallbackError } from '@utilComponents/fallback-error';

import { ConsentPurposeVersion } from '../../types';

import dataSource from './purpose-list-version.json';

export const PurposeListVersion = () => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const columns: ColumnsType<ConsentPurposeVersion> = [
    {
      title: 'Purpose',
      key: 'name',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Create Date',
      dataIndex: 'created_dt',
      key: 'created_dt',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: 'Create By',
      dataIndex: 'created_by',
      key: 'created_by',
      width: 150,
    },
    {
      title: 'Last Update Date',
      dataIndex: 'updated_dt',
      key: 'updated_dt',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
  ];

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });
  return (
    <Card title="Version List" extra={ColumnTransfer}>
      <Table
        columns={filteredColumns}
        dataSource={dataSource ?? []}
        pagination={false}
        scroll={{ x: 600 }}
        tableLayout="fixed"
      />
      <Pagination
        current={page}
        total={1}
        pageSize={pageSize}
        onChange={onPaginationChange}
      />
    </Card>
  );
};
