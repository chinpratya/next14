import { css } from '@emotion/css';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { IntlMessage } from '@/components/util-components/intl-message';
import { formatNumber } from '@/utils';

import { EventSummaryList } from '../../types';

import { ReportEventUsageSummaryHostnameTable } from './report-event-usage-summary-hostname-table';

type ReportEventUsageSummaryTableProps = {
  dataSource?: Record<string, unknown>[];
  eventSummary: EventSummaryList;
};

export const ReportEventUsageSummaryTable = ({
  dataSource,
  eventSummary,
}: ReportEventUsageSummaryTableProps) => {
  const columns: ColumnsType<Record<string, unknown>> = [
    {
      key: 'indices',
      title: (
        <IntlMessage id="logManagement.indices.title" />
      ),
      dataIndex: 'label',
      ellipsis: true,
    },
    {
      key: 'total',
      title: (
        <IntlMessage id="logManagement.report.totalSummary" />
      ),
      dataIndex: 'value',
      render: (value: number) => formatNumber(value),
    },
  ];

  return (
    <Table
      className={css`
        margin-top: 2rem;
        .ant-table-thead > tr > th {
          background-color: #f7f7f8;
        }
      `}
      bordered
      size="middle"
      rowKey="label"
      dataSource={dataSource}
      columns={columns}
      expandable={{
        expandedRowRender: (record) => {
          return (
            <ReportEventUsageSummaryHostnameTable
              dataSource={
                eventSummary?.[record.label as string] ??
                []
              }
            />
          );
        },
        rowExpandable: (record) =>
          record.name !== 'Not Expandable',
      }}
      pagination={false}
    />
  );
};
