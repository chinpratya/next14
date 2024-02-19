import { Flex } from '@mantine/core';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

import { useColumnFiltered } from '@/hooks';
import { ShowPassTagDate } from '@components/show-pass-tag-date';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { IntlMessage } from '@utilComponents/intl-message';

import { STATUS_ITEMS } from '../../config/status';
import { PortalAssessment } from '../../types/assessment';

export type PortalAssessmentTableProps = {
  loading?: boolean;
  dataSource: PortalAssessment[];
  onEdit: (assessment: PortalAssessment) => void;
};

export const PortalAssessmentTable = ({
  loading,
  dataSource,
  onEdit,
}: PortalAssessmentTableProps) => {
  const columns: ColumnsType<PortalAssessment> = [
    {
      title: (
        <IntlMessage id="compliancePortal.assessment.list.name" />
      ),
      key: 'name',
      width: 200,
      ellipsis: true,
      render: (assessment) => (
        <Typography.Link
          onClick={() => onEdit(assessment)}
          disabled={
            dayjs(assessment?.startDt) > dayjs() ||
            dayjs(assessment?.endDt) < dayjs()
          }
        >
          {assessment.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="compliancePortal.assessment.list.formName" />
      ),
      key: 'formName',
      dataIndex: 'formName',
      ellipsis: true,
      width: 350,
    },
    {
      title: (
        <IntlMessage id="compliancePortal.assessment.list.status" />
      ),
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      width: 150,
      render: (status) => (
        <ShowTagStatus
          status={status}
          items={STATUS_ITEMS}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="compliancePortal.assessment.list.createdDt" />
      ),
      key: 'createdDt',
      dataIndex: 'createdDt',
      align: 'center',
      width: 200,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="compliancePortal.assessment.list.deadlineDt" />
      ),
      key: 'deadlineDt',
      dataIndex: 'deadlineDt',
      align: 'center',
      width: 180,
      render: (deadline: string) => (
        <ShowPassTagDate date={deadline} />
      ),
    },
    {
      title: (
        <IntlMessage id="compliancePortal.assessment.list.startDt" />
      ),
      key: 'startDt',
      dataIndex: 'startDt',
      align: 'center',
      width: 180,
      render: (startDt: string) => (
        <ShowTagDate date={startDt} />
      ),
    },
    {
      title: (
        <IntlMessage id="compliancePortal.assessment.list.endDt" />
      ),
      key: 'endDt',
      dataIndex: 'endDt',
      align: 'center',
      width: 180,
      render: (endDt: string) => (
        <ShowTagDate date={endDt} />
      ),
    },
    {
      title: (
        <IntlMessage id="compliancePortal.assessment.list.approveDt" />
      ),
      key: 'approveDt',
      dataIndex: 'approveDt',
      align: 'center',
      width: 180,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
  ];

  // const { ExportCsv } = useCsv({
  //   columns,
  //   data: dataSource,
  //   fileName: 'Assessment.csv',
  // });

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });

  return (
    <>
      <Flex justify="end" gap="md" className="mb-4">
        {/* {ExportCsv} */}
        {ColumnTransfer}
      </Flex>
      <Table
        rowKey="ObjectUUID"
        tableLayout="fixed"
        scroll={{ x: 'scroll' }}
        loading={loading}
        columns={filteredColumns}
        dataSource={dataSource}
      />
    </>
  );
};
