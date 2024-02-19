import { Flex } from '@mantine/core';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { useColumnFiltered } from '@/hooks';
// import { ProgressBarWithInfo } from '@components/progress-bar-with-info';
import { ShowTagDate } from '@components/show-tag-date';
// import { ShowTagStatus } from '@components/show-tag-status';
import { IntlMessage } from '@utilComponents/intl-message';

// import { STATUS_ITEMS } from '../../config/status';
import { ResultAssessment } from '../../types/assessment';

export type AssessmentResultTableProps = {
  loading?: boolean;
  dataSource: ResultAssessment[];
  onEdit: (assessment: ResultAssessment) => void;
};

export const AssessmentResultTable = ({
  loading,
  dataSource,
  onEdit,
}: AssessmentResultTableProps) => {
  const columns: ColumnsType<ResultAssessment> = [
    {
      title: (
        <IntlMessage id="compliancePortal.result.name" />
      ),
      key: 'name',
      width: 250,
      ellipsis: true,
      render: (assessment) => (
        <Typography.Link
          onClick={() => onEdit(assessment)}
        >
          {assessment.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="compliancePortal.result.assessmentName" />
      ),
      key: 'assessmentName',
      dataIndex: 'assessmentName',
      ellipsis: true,
      width: 250,
    },
    {
      title: (
        <IntlMessage id="compliancePortal.result.submitDt" />
      ),
      key: 'submitDt',
      dataIndex: 'submitDt',
      align: 'center',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
  ];

  // const { ExportCsv } = useCsv({
  //   data: dataSource,
  //   columns,
  //   fileName: 'assessment-result',
  // });

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns: columns,
    });

  return (
    <>
      <Flex justify="end" className="mb-4" gap="sm">
        {/* {ExportCsv} */}
        {ColumnTransfer}
      </Flex>
      <Table
        rowKey="ObjectUUID"
        loading={loading}
        columns={filteredColumns}
        dataSource={dataSource}
        scroll={{ x: true }}
      />
    </>
  );
};
