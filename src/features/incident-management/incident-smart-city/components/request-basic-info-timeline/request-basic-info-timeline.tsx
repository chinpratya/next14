import { CalendarOutlined } from '@ant-design/icons';
import { Card, Descriptions, Typography } from 'antd';
import dayjs from 'dayjs';

import { useToggle } from '@/hooks';

import { RequestDetail } from '../../types';
import { RequestBasicInfoTimelineManageModal } from '../request-basic-info-timeline-manage-modal';

type RequestBasicInfoTimelineProps = {
  data?: RequestDetail;
};

export const RequestBasicInfoTimeline = ({
  data,
}: RequestBasicInfoTimelineProps) => {
  const toggle = useToggle();

  return (
    <>
      <Card title="ระยะเวลา">
        <Descriptions column={1}>
          <Descriptions.Item label="วันที่เปิด">
            <Typography.Text>
              {dayjs(data?.createDt).format('DD-MM-YYYY')}{' '}
              <CalendarOutlined />
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="ขยายเวลา">
            {data?.isExtraTime ? 'Yes' : 'No'}
          </Descriptions.Item>
          <Descriptions.Item label="วันสิ้นสุด">
            <Typography.Link
              onClick={() => toggle.edit()}
            >
              {dayjs(data?.endProcressDt).format(
                'DD-MM-YYYY'
              )}{' '}
              <CalendarOutlined />
            </Typography.Link>
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <RequestBasicInfoTimelineManageModal
        open={toggle.openEdit}
        onCancel={() => toggle.edit()}
        requestId={data?.requestID as string}
        isextratime={data?.isExtraTime ?? false}
      />
    </>
  );
};
