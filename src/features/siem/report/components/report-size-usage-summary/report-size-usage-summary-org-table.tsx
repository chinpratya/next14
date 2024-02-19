import { css } from '@emotion/css';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { IntlMessage } from '@/components/util-components/intl-message';
import { useGetSetting } from '@/features/log-management';
import { convertBytesToSize } from '@/utils';

type ReportSizeUsageSummaryOrgTableProps = {
  dataSource?: Record<string, unknown>[];
};

export const ReportSizeUsageSummaryOrgTable = ({
  dataSource,
}: ReportSizeUsageSummaryOrgTableProps) => {
  const setting = useGetSetting({});

  const columns: ColumnsType<Record<string, unknown>> = [
    {
      key: 'company',
      title: (
        <IntlMessage id="logManagement.report.company" />
      ),
      dataIndex: 'label',
      render: () => setting.data?.name ?? '-',
    },
    {
      key: 'sum',
      title: (
        <IntlMessage id="logManagement.report.size" />
      ),
      dataIndex: 'sum',
      width: 130,
      render: (value: number) =>
        convertBytesToSize(value),
    },
    {
      key: 'min',
      title: (
        <IntlMessage id="logManagement.report.minSize" />
      ),
      dataIndex: 'min',
      width: 130,
      render: (value: number) =>
        convertBytesToSize(value),
    },
    {
      key: 'max',
      title: (
        <IntlMessage id="logManagement.report.maxSize" />
      ),
      dataIndex: 'max',
      width: 130,
      render: (value: number) =>
        convertBytesToSize(value),
    },
    {
      key: 'average',
      title: (
        <IntlMessage id="logManagement.report.average" />
      ),
      dataIndex: 'avg',
      width: 130,
      render: (value: number) =>
        convertBytesToSize(+value.toFixed(0)),
    },
  ];

  return (
    <Table
      className={css`
        .ant-table-thead > tr > th {
          background-color: #f7f7f8;
          padding: 10px 16px;
        }

        .ant-table-tbody > tr > td {
          padding: 10px 16px;
        }
      `}
      bordered
      rowKey="sum"
      dataSource={dataSource}
      columns={columns}
      pagination={false}
    />
  );
};
