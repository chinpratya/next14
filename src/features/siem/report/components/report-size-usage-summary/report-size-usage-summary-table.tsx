import { css } from '@emotion/css';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { IntlMessage } from '@/components/util-components/intl-message';
import { convertBytesToSize } from '@/utils';

import { EventSummaryList } from '../../types';

import { ReportSizeUsageSummaryHostnameTable } from './report-size-usage-summary-hostname-table';

type ReportSizeUsageSummaryTableProps = {
  dataSource?: Record<string, unknown>[];
  eventSummary: EventSummaryList;
};

export const ReportSizeUsageSummaryTable = ({
  dataSource,
  eventSummary,
}: ReportSizeUsageSummaryTableProps) => {
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
      render: (value: number) =>
        convertBytesToSize(value),
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
            <ReportSizeUsageSummaryHostnameTable
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
