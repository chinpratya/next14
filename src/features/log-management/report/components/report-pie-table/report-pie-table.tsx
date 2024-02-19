import { css } from '@emotion/css';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

type ReportPieTableProps = {
  data?: Record<string, unknown>[];
  columns?: ColumnsType<Record<string, unknown>>;
  loading?: boolean;
  rowKey: string;
};

export const ReportPieTable = ({
  data,
  columns,
  loading,
  rowKey,
}: ReportPieTableProps) => {
  return (
    <Table
      rowKey={rowKey}
      loading={loading}
      className={css`
        width: 60%;
        .ant-table-cell {
          padding: 10px;
        }

        /* .ant-table-tbody > tr > td:first-child {
      border-right: 0px !important;
    } */

        .ant-table-container
          table
          > thead
          > tr:first-child
          th:first-child {
          padding-left: 37px;
        }
      `}
      bordered
      dataSource={data ?? []}
      pagination={false}
      columns={columns ?? []}
    />
  );
};
