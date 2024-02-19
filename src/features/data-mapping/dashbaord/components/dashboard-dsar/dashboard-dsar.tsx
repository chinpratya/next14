import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { usePagination } from '@/hooks';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListDashboardDsar } from '../../api/list-dashboard-dsar';
import { DashboardLawfulBasisType } from '../../types';

export const DashboardDsar = () => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination({
    pageSize: 3,
  });

  const { data, isError, isLoading } =
    useListDashboardDsar({
      page,
      pageSize,
    });
  const columns: ColumnsType<DashboardLawfulBasisType> = [
    {
      title: (
        <IntlMessage id="dataMapping.dashboard.dsar.table.activity" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dashboard.dsar.table.amount" />
      ),
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      width: 50,
    },
  ];

  return (
    <Card
      title={
        <IntlMessage id="dataMapping.dashboard.dsar" />
      }
      style={{ height: '410px' }}
    >
      <FallbackError isError={isError}>
        <Table
          rowKey="ObjectUUID"
          loading={isLoading}
          columns={columns}
          dataSource={data?.data ?? []}
          pagination={false}
          tableLayout="fixed"
          scroll={{ x: 200, y: 270 }}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </FallbackError>
    </Card>
  );
};
