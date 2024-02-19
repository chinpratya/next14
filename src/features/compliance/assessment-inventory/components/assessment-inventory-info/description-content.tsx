import { Card, Descriptions } from 'antd';

// import { ShowPassTagDate } from '@/components/shared-components/show-pass-tag-date';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
// import { ShowTagStatus } from '@components/show-tag-status';

import { AssessmentInventory } from '../../types';

type BaseInfoContentProps = {
  data: AssessmentInventory | null;
  loading: boolean;
};
export const DescriptionContent = ({
  data,
  loading,
}: BaseInfoContentProps) => {
  // const statusItems = [
  //   {
  //     label: 'แบบร่าง',
  //     key: 'draft',
  //     color: '#FFC542',
  //   },
  //   {
  //     label: 'เสร็จสิ้น',
  //     key: 'publish',
  //     color: '#21B573',
  //   },
  // ];
  return (
    <Card title="รายละเอียด" loading={loading}>
      <Descriptions column={2}>
        {/* <Descriptions.Item
          label="วันที่แก้ไขล่าสุด"
          span={2}
        >
          <ShowPassTagDate date={data?.updatedDt} />
        </Descriptions.Item> */}
        <Descriptions.Item label="วันที่สร้าง">
          <ShowTagDate date={data?.createdDt} />
        </Descriptions.Item>
        <Descriptions.Item label="ผู้สร้าง" span={2}>
          {data?.createdBy}
        </Descriptions.Item>
        <Descriptions.Item label="รายละเอียด">
          {data?.description}
        </Descriptions.Item>
        {/* <Descriptions.Item label="สถานะ">
          <ShowTagStatus
            items={statusItems}
            status={data?.status}
          />
        </Descriptions.Item>
        <Descriptions.Item label="เวอร์ชั่น">
          <Tag color="#3364FD">
            {`V${data?.version}` ?? '-'}
          </Tag>
        </Descriptions.Item> */}
      </Descriptions>
    </Card>
  );
};
