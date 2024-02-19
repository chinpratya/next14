import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListDashboardRights } from '../../api/list-dashboard-rights';
import { DashboardLawfulBasisType } from '../../types';

export const DashboardRightOfDataSubject = () => {
  const { data, isError, isLoading } =
    useListDashboardRights({});

  const columns: ColumnsType<DashboardLawfulBasisType> = [
    {
      title: (
        <IntlMessage id="dataMapping.dashboard.rightOfDataSubject.table.name" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 150,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dashboard.rightOfDataSubject.table.amount" />
      ),
      dataIndex: 'amount',
      key: 'amount',
      width: 50,
      align: 'center',
    },
  ];
  return (
    <Card
      title={
        <IntlMessage id="dataMapping.dashboard.rightOfDataSubject" />
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
          scroll={{ x: 250, y: 270 }}
        />
      </FallbackError>
    </Card>
  );
};
