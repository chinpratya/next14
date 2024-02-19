import { css } from '@emotion/css';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import React from 'react';

type DataType = {
  level: number;
  title: string;
  description?: string;
  effects_to_people?: string;
  legal_impact?: string;
};

export type TableSelectionProps = {
  onChange?: (level: number) => void;
  columns: ColumnsType<DataType>;
  dataSource: DataType[];
  title: React.ReactNode | string;
  value?: number;
};
export const TableSelection = ({
  onChange,
  columns,
  dataSource,
  title,
  value,
}: TableSelectionProps) => {
  const rowSelection: TableRowSelection<DataType> = {
    type: 'radio',
    selectedRowKeys: value ? [value] : [],
    onChange: (selectedRowKeys) => {
      onChange?.((selectedRowKeys[0] as number) ?? 0);
    },
  };

  return (
    <Card
      title={title}
      className={css`
        margin-bottom: 10px;

        .ant-card-head {
          border-bottom: 1px solid #e8e8e8 !important;
          margin-bottom: 1px;

          .ant-card-head-title {
            padding: 16px;
          }
        }

        .ant-card-body {
          padding: 0;

          textarea {
            border: 0;
            border-radius: 0;
          }
        }

        .ant-pagination {
          padding: 0 16px;
        }
      `}
    >
      <Table
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
        rowKey={'level'}
        pagination={false}
      />
    </Card>
  );
};
