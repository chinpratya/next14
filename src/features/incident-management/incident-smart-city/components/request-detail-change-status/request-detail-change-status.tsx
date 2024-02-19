import { EditOutlined } from '@ant-design/icons';
import { Card, Descriptions } from 'antd';

import {
  ERROR_COLOR,
  PROCESSING_COLOR,
  SUCCESS_COLOR,
  PENDING_COLOR,
} from '@/config/color';
import { useToggle } from '@/hooks';
import { ShowTagStatus } from '@components/show-tag-status';

import { RequestDetail } from '../../types';
import { RequestDetailChangeStatusModal } from '../request-detail-change-status-modal';

type RequestDetailChangeStatusProps = {
  data?: RequestDetail;
  requestId: string;
};

export const RequestDetailChangeStatus = ({
  data,
  requestId,
}: RequestDetailChangeStatusProps) => {
  const toggle = useToggle();

  return (
    <>
      <Card
        title={
          <>
            จัดการสถานะ
            <EditOutlined
              className="text-primary ml-2"
              onClick={() => toggle.change()}
            />
          </>
        }
      >
        <Descriptions column={1}>
          <Descriptions.Item label="สถานะ">
            <ShowTagStatus
              status={data?.status}
              items={[
                {
                  label: 'เปิด',
                  key: 'opened',
                  color: SUCCESS_COLOR,
                },
                {
                  label: 'เสร็จสิ้น',
                  key: 'closed',
                  color: ERROR_COLOR,
                },
                {
                  label: 'เสร็จสิ้น',
                  key: 'complete',
                  color: PROCESSING_COLOR,
                },
                {
                  label: 'กำลังดำเนินงาน',
                  key: 'pending',
                  color: PENDING_COLOR,
                },
              ]}
            />
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <RequestDetailChangeStatusModal
        open={toggle.openChange}
        onCancel={() => toggle.change()}
        requestId={requestId}
        data={data}
      />
    </>
  );
};
