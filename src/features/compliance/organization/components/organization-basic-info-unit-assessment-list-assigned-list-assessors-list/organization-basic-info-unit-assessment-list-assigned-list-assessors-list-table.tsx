import { Table } from 'antd';

import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { ShowTagStatus } from '@/components/share-components/show-tag-status';
import { SUCCESS_COLOR } from '@/config/color';

import { OrganizationUnitAssignmentRespondent } from '../../types';

type OrganizationBasicInfoUnitAssessmentListAssignedListAssessorsTableProps =
  {
    dataSource?: OrganizationUnitAssignmentRespondent[];
    loading: boolean;
  };

export const OrganizationBasicInfoUnitAssessmentListAssignedListAssessorsTable =
  ({
    dataSource,
    loading,
  }: OrganizationBasicInfoUnitAssessmentListAssignedListAssessorsTableProps) => {
    const columns = [
      {
        title: 'ผู้ตอบแบบประเมิน',
        dataIndex: 'respondentName',
        key: 'respondentName',
      },
      {
        title: 'อีเมลสำหรับใช้ตอบแบบประเมิน',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'แผนก',
        dataIndex: 'department',
        key: 'department',
      },
      {
        title: 'สถานะ',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => (
          <ShowTagStatus
            status={status}
            items={[
              {
                label: 'ประเมินเสร็จสิ้น',
                key: 'ประเมินเสร็จสิ้น',
                color: SUCCESS_COLOR,
              },
            ]}
          />
        ),
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
        title: 'วันที่ทำแบบประเมินเสร็จสิ้น',
        dataIndex: 'complateDt',
        key: 'complateDt',
        render: (date: string) => (
          <ShowTagDate date={date} />
        ),
      },
    ];

    return (
      <Table
        rowKey="ObjectUUID"
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
      />
    );
  };
