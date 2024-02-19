import { Card, Descriptions } from 'antd';

import { ShowPassTagDate } from '@components/show-pass-tag-date';
import { ShowTagDate } from '@components/show-tag-date';

export type CardDescriptionProps = {
  createdDt?: string;
  createdBy?: string;
  updatedDt?: string;
};

export const CardDescription = ({
  createdDt,
  createdBy,
  updatedDt,
}: CardDescriptionProps) => {
  return (
    <Card title="รายละเอียด">
      <Descriptions
        column={{
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
      >
        <Descriptions.Item label="วันที่แก้ไขล่าสุด">
          <ShowPassTagDate date={updatedDt} />
        </Descriptions.Item>
        <Descriptions.Item label="ผู้สร้าง ">
          {createdBy ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label="วันที่สร้าง">
          <ShowTagDate date={createdDt} />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
