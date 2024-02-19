import { Card, Table } from 'antd';

import { usePagination } from '@/hooks';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListDashboardThirdPartyLocation } from '../../api/list-dashboard-third-party-location';

export const DashboardThirdPartyLocation = () => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination({
    pageSize: 3,
  });

  const { data, isError, isLoading } =
    useListDashboardThirdPartyLocation({
      page,
      pageSize,
    });
  const columns = [
    {
      title: (
        <IntlMessage id="dataMapping.dashboard.thirdPartyLocation.table.name" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dashboard.thirdPartyLocation.table.role" />
      ),
      dataIndex: 'role',
      key: 'role',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dashboard.thirdPartyLocation.table.country" />
      ),
      dataIndex: 'country',
      key: 'country',
      width: 100,
    },
  ];

  return (
    <Card
      title={
        <IntlMessage id="dataMapping.dashboard.thirdPartyLocation" />
      }
      bordered={false}
    >
      <FallbackError isError={isError}>
        <Table
          rowKey="ObjectUUID"
          loading={isLoading}
          columns={columns}
          dataSource={data?.data ?? []}
          pagination={false}
          tableLayout="fixed"
          scroll={{ x: 350, y: 270 }}
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
