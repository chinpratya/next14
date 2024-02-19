import { css } from '@emotion/css';
import {
  Badge,
  Card,
  Descriptions,
  Progress,
} from 'antd';

import { type RequestDetail } from '@/features/incident-management';

import { useListRequestTask } from '../../../incident-smart-city/api/list-request-task';
type IncidentProgressChartProps = {
  data?: RequestDetail;
  requestId: string;
  stateId: string;
};

export const IncidentProgressChart = ({
  requestId,
  stateId,
}: IncidentProgressChartProps) => {
  const badgeCss = css`
    .ant-badge-status-dot {
      border-radius: 0;
      height: 13px;
      width: 5px;
    }
  `;

  const { data } = useListRequestTask(requestId, stateId);

  const percentage = () => {
    const datas = data?.data;

    const assigned = datas?.filter(
      (r) => r.status == 'assigned'
    );
    const pending = datas?.filter((r) => {
      r.status == 'pending', r.status == 'unverified';
    });
    const val =
      ((assigned?.length || 0) / (pending?.length || 0)) *
      100;
    if (val > 100) {
      return 100;
    } else {
      return Math.ceil(val);
    }
  };

  return (
    <Card title={`ความคืบหน้า (${percentage()}%)`}>
      <Progress
        strokeColor="#3F79F7"
        trailColor="#D4D4D4"
        percent={percentage()}
      />
      <Descriptions layout="horizontal" column={2}>
        <Descriptions.Item>
          <Badge
            color="#3F79F7"
            text="เสร็จสิ้น"
            className={badgeCss}
          />
        </Descriptions.Item>
        <Descriptions.Item>
          <Badge
            color="#D4D4D4"
            text="กำลังดำเนินการ"
            className={badgeCss}
          />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
