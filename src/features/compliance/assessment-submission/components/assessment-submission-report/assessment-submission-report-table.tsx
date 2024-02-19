import { css } from '@emotion/css';
import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { useEffect, useState } from 'react';

import util from '@/utils';

import { TableReport as TableType } from '../../types';

export type AssessmentReportTableProps = {
  loading?: boolean;
  data?: TableType[];
};

export const AssessmentReportTable = ({
  loading,
  data = [],
}: AssessmentReportTableProps) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<
    string[]
  >([]);

  const columns: ColumnType<TableType>[] = [
    {
      title: 'ส่วน',
      dataIndex: 'label',
      key: 'label',
      align: 'center',
      width: 50,
    },
    {
      title: 'รายละเอียด',
      dataIndex: 'name',
      key: 'name',
      width: 400,
    },
    {
      title: 'คะแนนเต็ม',
      width: 100,
      align: 'center',
      dataIndex: 'maxScore',
    },
    {
      title: 'คะแนนได้',
      width: 100,
      align: 'center',
      dataIndex: 'score',
      render: (value) =>
        value > 0 ? util.formatDecimal(value) : '-',
    },
    {
      title: 'คิดเป็น %',
      width: 100,
      align: 'center',
      dataIndex: 'percent',
      render: (value) =>
        value > 0 ? util.formatDecimal(value) : '-',
    },
    {
      title: 'Maturity Model Level',
      width: 100,
      align: 'center',
      render: () => '-',
    },
  ];

  // if (reportType === 'department')
  //   columns.push({
  //     title: 'ข้อเสนอแนะ',
  //     align: 'center',
  //     width: 150,
  //     render: () => (
  //       <Typography.Link>เพิ่มข้อเสนอแนะ</Typography.Link>
  //     ),
  //   });

  const onExpand = (
    expanded: boolean,
    record: TableType
  ) => {
    if (expanded) {
      setExpandedRowKeys((prev) => [
        ...prev,
        record.ObjectUUID,
      ]);
    } else {
      setExpandedRowKeys((prev) =>
        prev.filter((key) => key !== record.ObjectUUID)
      );
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      const expandedRowKeys = data?.map(
        (row) => row.ObjectUUID
      );
      setExpandedRowKeys(expandedRowKeys);
    }
  }, [data]);

  return (
    <>
      <div className="mt-4" />
      <Table
        tableLayout="fixed"
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
        expandable={{
          expandedRowKeys,
          onExpand,
        }}
      />
    </>
  );
};
