import { css } from '@emotion/css';
import { Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { tokens } from '@/lang';
import { IntlMessage } from '@utilComponents/intl-message';

import { RiskLikelihoodType } from '../../types';

export type RiskAssessmentLikelihoodProps = {
  value?: number;
  onChange?: (value: number) => void;
  dataSource?: RiskLikelihoodType[];
  isLoading?: boolean;
};

export const RiskAssessmentLikelihood = ({
  value,
  onChange,
  dataSource,
  isLoading,
}: RiskAssessmentLikelihoodProps) => {
  const columns: ColumnsType<RiskLikelihoodType> = [
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.request.likelihood}
        />
      ),
      key: 'name',
      dataIndex: 'name',
      width: 250,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.request.description}
        />
      ),
      key: 'description',
      dataIndex: 'description',
      width: 500,
    },
  ];

  return (
    <Card
      title={
        <IntlMessage
          id={tokens.dataBreach.request.chanceTitle}
        />
      }
      className={css`
        .ant-card-head-title {
          padding-bottom: 16px;
        }

        .ant-table-thead,
        .ant-table-thead > tr,
        .ant-table-thead > tr > th {
          background-color: #f7f7f8;
        }

        .ant-card-body {
          padding: 0;
          margin-bottom: 8px;
        }
      `}
    >
      <Table
        loading={isLoading}
        rowKey="ObjectUUID"
        tableLayout="fixed"
        scroll={{
          x: 800,
        }}
        columns={columns}
        dataSource={dataSource}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: [value ?? 0],
          onChange: (selectedRowKeys) => {
            if (selectedRowKeys?.[0]) {
              onChange?.(
                parseInt(selectedRowKeys?.[0] as string)
              );
            }
          },
        }}
        pagination={false}
      />
    </Card>
  );
};
