import { ContainerOutlined } from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { Button, Table } from 'antd';
import { useRouter } from 'next/router';

import { ShowPassTagDate } from '@/components/share-components/show-pass-tag-date';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { IconBackground } from '@/components/util-components/icon-background';
import { useColumnFiltered, useCsv } from '@/hooks';

import { OrganizationUnitAssignment } from '../../types';

type OrganizationBasicInfoUnitAssessmentListAssignedTableProps =
  {
    dataSource?: OrganizationUnitAssignment[];
    loading: boolean;
  };

export const OrganizationBasicInfoUnitAssessmentListAssignedTable =
  ({
    dataSource,
    loading,
  }: OrganizationBasicInfoUnitAssessmentListAssignedTableProps) => {
    const router = useRouter();

    const columns = [
      {
        title: 'ชื่อแบบสำรวจ',
        key: 'assessmentName',
        render: ({
          ObjectUUID,
          assessmentName,
        }: OrganizationUnitAssignment) => (
          <Button
            className="p-0"
            type="link"
            icon={
              <IconBackground
                icon={<ContainerOutlined />}
              />
            }
            onClick={() =>
              router.push(
                `${router.pathname}/assignment/${ObjectUUID}`
              )
            }
          >
            {assessmentName}
          </Button>
        ),
      },
      {
        title: 'ประเภท',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'ฉบับที่',
        dataIndex: 'no',
        key: 'no',
      },
      {
        title: 'วันที่ได้รับแบบประเมิน',
        dataIndex: 'assignmentDt',
        key: 'assignmentDt',
        render: (date: string) => (
          <ShowTagDate date={date} />
        ),
      },
      {
        title: 'ระยะเวลาคงเหลือ',
        dataIndex: 'expireDt',
        key: 'expireDt',
        render: (date: string) => (
          <ShowPassTagDate date={date} />
        ),
      },
      {
        title: 'ผู้ตอบแบบประเมิน',
        dataIndex: 'respondentCount',
        key: 'respondentCount',
      },
    ];

    const { ExportCsv } = useCsv({
      data: dataSource,
      columns,
      fileName: 'ListAssigned.csv',
    });

    const { filteredColumns, ColumnTransfer } =
      useColumnFiltered({
        id: 'organization-basic-info-unit-assessment-list-assigned-list-table',
        columns,
      });

    return (
      <>
        <Flex justify="end" className="mb-4" gap="sm">
          {ExportCsv}
          {ColumnTransfer}
        </Flex>
        <Table
          rowKey="ObjectUUID"
          columns={filteredColumns}
          dataSource={dataSource}
          loading={loading}
          pagination={false}
        />
      </>
    );
  };
