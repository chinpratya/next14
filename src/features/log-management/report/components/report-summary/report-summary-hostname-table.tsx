import { css } from '@emotion/css';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { IntlMessage } from '@/components/util-components/intl-message';
import { formatNumber } from '@/utils';

type ReportSummaryHostnameTableProps = {
  dataSource?: Record<string, unknown>[];
};

export const ReportSummaryHostnameTable = ({
  dataSource,
}: ReportSummaryHostnameTableProps) => {
  const columns: ColumnsType<Record<string, unknown>> = [
    {
      key: 'hostname',
      title: (
        <IntlMessage id="logManagement.report.hostname" />
      ),
      width: 350,
      dataIndex: 'hostname',
      ellipsis: true,
    },
    {
      key: 'size',
      width: 150,
      title: (
        <IntlMessage id="logManagement.report.size" />
      ),
      dataIndex: 'sum',
      render: (value: number) => formatNumber(value),
    },
    {
      key: 'min',
      width: 150,
      title: (
        <IntlMessage id="logManagement.report.minSize" />
      ),
      dataIndex: 'min',
      render: (value: number) => formatNumber(value),
    },
    {
      key: 'max',
      width: 170,
      title: (
        <IntlMessage id="logManagement.report.maxSize" />
      ),
      dataIndex: 'max',
      render: (value: number) => formatNumber(value),
    },
    {
      key: 'average',
      width: 150,
      title: (
        <IntlMessage id="logManagement.report.average" />
      ),
      dataIndex: 'avg',
      render: (value: number) =>
        formatNumber(+value.toFixed(0)),
    },
  ];

  return (
    <Table
      className={css`
        .ant-table-thead > tr > th {
          background-color: #f7f7f8;
        }

        .ant-table table {
          border-top: 0 !important;
        }

        .ant-table-container,
        .ant-table-container
          table
          > thead
          > tr:first-child
          th:first-child {
          border-top-left-radius: 0;
        }

        .ant-table-container
          table
          > thead
          > tr:first-child
          th:last-child {
          border-top-right-radius: 0;
        }
      `}
      scroll={{ x: 750 }}
      size="middle"
      bordered
      rowKey="hostname"
      dataSource={dataSource}
      columns={columns}
      pagination={false}
    />
  );
};
