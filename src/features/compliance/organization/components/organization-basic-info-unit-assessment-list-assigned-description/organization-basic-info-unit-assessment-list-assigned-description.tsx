import { Card, Descriptions } from 'antd';

import { ShowPassTagDate } from '@/components/share-components/show-pass-tag-date';
import { ShowTagDate } from '@/components/share-components/show-tag-date';

import { OrganizationUnitAssignment } from '../../types';

type OrganizationBasicInfoUnitAssessmentListAssignedDescriptionProps =
  {
    data?: OrganizationUnitAssignment;
  };

export const OrganizationBasicInfoUnitAssessmentListAssignedDescription =
  ({
    data,
  }: OrganizationBasicInfoUnitAssessmentListAssignedDescriptionProps) => {
    return (
      <Card>
        <Descriptions column={3}>
          <Descriptions.Item label="ชื่อแบบสำรวจ">
            {data?.assessmentName}
          </Descriptions.Item>
          <Descriptions.Item label="ประเภท">
            {data?.type}
          </Descriptions.Item>
          <Descriptions.Item label="ฉบับที่">
            {data?.no}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions column={4}>
          <Descriptions.Item label="จำนวนผู้ทำแบบประเมิน">
            {data?.respondentCount}
          </Descriptions.Item>
          <Descriptions.Item label="วันที่เริ่มทำแบบประเมิน">
            <ShowTagDate date={data?.assignmentDt} />
          </Descriptions.Item>
          <Descriptions.Item label="วันที่สิ้นสุดการประเมิน">
            <ShowTagDate date={data?.expireDt} />
          </Descriptions.Item>
          <Descriptions.Item label="คงเหลือ">
            <ShowPassTagDate date={data?.expireDt} />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    );
  };
