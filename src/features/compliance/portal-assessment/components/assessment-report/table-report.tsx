import { css } from '@emotion/css';
import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';

import util from '@/utils';
// import { Advisor } from '@components/advisor';
import { IntlMessage } from '@utilComponents/intl-message';

import { Table as TableType } from '../../types/report';

export type TableReportProps = {
  loading?: boolean;
  data?: TableType[];
  reportType: string;
};

export const TableReport = ({
  loading,
  data = [],
}: TableReportProps) => {
  const columns: ColumnType<TableType>[] = [
    {
      title: (
        <IntlMessage id="compliancePortal.result.detail.report.label" />
      ),
      dataIndex: 'label',
      key: 'label',
      align: 'center',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="compliancePortal.result.detail.report.name" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 400,
    },
    {
      title: (
        <IntlMessage id="compliancePortal.result.detail.report.maxScore" />
      ),
      dataIndex: 'maxScore',
      width: 100,
      align: 'center',
    },
    {
      title: (
        <IntlMessage id="compliancePortal.result.detail.report.score" />
      ),
      dataIndex: 'score',
      width: 100,
      align: 'center',
      render: (value) =>
        value > 0 ? util.formatDecimal(value) : '-',
    },
    {
      title: (
        <IntlMessage id="compliancePortal.result.detail.report.percent" />
      ),
      dataIndex: 'percent',
      width: 100,
      align: 'center',
      render: (value) =>
        value > 0 ? util.formatDecimal(value) : '-',
    },
    {
      title: (
        <IntlMessage id="compliancePortal.result.detail.report.maturityModelLV" />
      ),
      width: 100,
      align: 'center',
      render: (value) =>
        value.maxScore === 0
          ? '-'
          : value.maturityModelLV,
    },
  ];
  // if (reportType === 'department')
  //   columns.push({
  //     title: 'ข้อเสนอแนะ',
  //     width: 200,
  //     align: 'left',
  //     render: () => (
  //       <Typography.Link>ดูข้อเสนอแนะ</Typography.Link>
  //     ),
  //   });
  return (
    <>
      <div className="mt-4" />
      {/* <Advisor adviser="คำแนะนำ" /> */}
      <Table
        className={css`
          .ant-table-thead > tr > th {
            border-radius: 0 !important;
            background-color: #1a3353;
            color: #fff;
            padding: 8px 16px;
            border-right: 1px solid #fff;

            :nth-child(2) {
              border-right: 0;
            }
          }

          .ant-table-tbody > tr {
            :hover {
              background-color: rgba(
                51,
                100,
                253,
                0.05
              ) !important;
            }
          }

          .ant-table-tbody
            > tr.ant-table-row-level-0
            > td {
            font-weight: 600;
            background-color: rgba(51, 100, 253, 0.1);
            border-bottom: 1px solid #fff;
          }

          .ant-table-tbody
            > tr.ant-table-row-level-1
            > td {
            background-color: rgba(51, 100, 253, 0.05);
          }
        `}
        rowKey="ObjectUUID"
        loading={loading}
        columns={columns}
        dataSource={data?.map((row) => ({
          ...row,
          children: row.child,
        }))}
        pagination={false}
        scroll={{ x: true }}
      />
    </>
  );
};
