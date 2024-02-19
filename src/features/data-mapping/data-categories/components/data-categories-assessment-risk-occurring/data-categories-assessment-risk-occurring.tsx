import { css } from '@emotion/css';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';

interface DataType {
  level: number;
  title: string;
  description: string;
}

type DataCategoriesAssessmentRiskOccurringProps = {
  onChange: (level: number) => void;
  columns: ColumnsType<DataType>;
  dataSource: DataType[];
};
export const DataCategoriesAssessmentRiskOccurring = ({
  onChange,
  columns,
  dataSource,
}: DataCategoriesAssessmentRiskOccurringProps) => {
  const rowSelection: TableRowSelection<DataType> = {
    type: 'radio',
    onChange: (selectedRowKeys) => {
      console.log(`selectedRowKeys`, selectedRowKeys[0]);
      onChange((selectedRowKeys[0] as number) ?? 0);
    },
  };

  return (
    <Card
      title="* โอกาสที่จะเกิดความเสี่ยง"
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
