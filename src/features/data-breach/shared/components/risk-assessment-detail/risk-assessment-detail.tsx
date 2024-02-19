import { css } from '@emotion/css';
import { Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { tokens } from '@/lang';
import { IntlMessage } from '@utilComponents/intl-message';

import { RiskAssessmentDetailType } from '../../types';

export type RiskAssessmentDetailProps = {
  riskDetails?: RiskAssessmentDetailType[];
  isLoading?: boolean;
};

export const RiskAssessmentDetail = ({
  riskDetails,
  isLoading,
}: RiskAssessmentDetailProps) => {
  const columns: ColumnsType<RiskAssessmentDetailType> = [
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.request.riskLevel}
        />
      ),
      key: 'name',
      dataIndex: 'name',
      width: 300,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.request.riskLevelScore}
        />
      ),
      key: 'score',
      dataIndex: 'score',
      width: 200,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.request.description}
        />
      ),
      key: 'description',
      dataIndex: 'description',
      width: 400,
    },
  ];

  return (
    <Card
      title={
        <IntlMessage
          id={tokens.dataBreach.request.summaryRiskDetail}
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

        .ant-table-row-selected > td {
          font-weight: bold;
        }

        .ant-card-body {
          padding: 0;
          margin-bottom: 8px;
        }
      `}
    >
      <Table
        loading={isLoading}
        rowKey="riskID"
        tableLayout="fixed"
        scroll={{
          x: 900,
        }}
        columns={columns}
        dataSource={riskDetails}
        pagination={false}
        rowClassName={(
          record: RiskAssessmentDetailType
        ) =>
          record?.isCurrenct
            ? 'ant-table-row-selected'
            : ''
        }
      />
    </Card>
  );
};
