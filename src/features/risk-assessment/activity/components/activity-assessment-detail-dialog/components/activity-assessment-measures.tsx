import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { HtmlContentFrame } from '@components/html-content-frame';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetMeasureForm } from '../../../../measure';
import { ActivityOfAssessmentDetailMeasureType } from '../../../types';

export type RiskAssessmentManagementProps = {
  measures?: ActivityOfAssessmentDetailMeasureType[];
};

const RiskAssessmentManagementDetail = ({
  measureId,
}: {
  measureId: string;
}) => {
  const { data, isLoading, isError } =
    useGetMeasureForm(measureId);

  if (isLoading) {
    return (
      <Typography.Text type="secondary">
        Loading...
      </Typography.Text>
    );
  }

  return (
    <FallbackError isError={isError}>
      <Typography.Title level={4}>
        คำสั่งควบคุม
      </Typography.Title>
      <HtmlContentFrame
        html={data?.measuredhtml || ''}
        height="300px"
      />
    </FallbackError>
  );
};

export const ActivityAssessmentMeasures = ({
  measures,
}: RiskAssessmentManagementProps) => {
  const columns: ColumnsType<ActivityOfAssessmentDetailMeasureType> =
    [
      {
        title: 'มาตรการ',
        width: 350,
        dataIndex: 'name',
        ellipsis: true,
      },
      {
        title: 'ป้ายกำกับ',
        width: 350,
        dataIndex: 'tagName',
        ellipsis: true,
      },
    ];

  return (
    <Table
      rowKey="measureID"
      tableLayout="fixed"
      scroll={{
        x: 700,
      }}
      columns={columns}
      dataSource={measures}
      expandable={{
        expandedRowRender: (
          record: ActivityOfAssessmentDetailMeasureType
        ) => (
          <RiskAssessmentManagementDetail
            measureId={record.measureID}
          />
        ),
      }}
    />
  );
};
