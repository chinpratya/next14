import { css } from '@emotion/css';
import { Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { tokens } from '@/lang';
import { IntlMessage } from '@utilComponents/intl-message';

import { RiskEffectType } from '../../types';

export type RiskAssessmentEffectProps = {
  value?: number;
  onChange?: (value: number) => void;
  dataSource?: RiskEffectType[];
  isLoading?: boolean;
};

export const RiskAssessmentEffect = ({
  value,
  onChange,
  dataSource,
  isLoading,
}: RiskAssessmentEffectProps) => {
  const columns: ColumnsType<RiskEffectType> = [
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.request.severity}
        />
      ),
      key: 'severity',
      dataIndex: 'severity',
      width: 200,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.request.effect}
        />
      ),
      key: 'effect',
      dataIndex: 'effect',
      width: 250,
    },
    {
      title: (
        <IntlMessage
          id={
            tokens.dataBreach.request.descriptionSeverity
          }
        />
      ),
      key: 'description',
      dataIndex: 'description',
      width: 250,
    },
  ];

  return (
    <Card
      title={
        <IntlMessage
          id={tokens.dataBreach.request.effect}
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
