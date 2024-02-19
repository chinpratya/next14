import { Card, Tabs } from 'antd';

import { RequestDetail } from '../../types';
import { RequestDetailActivity } from '../request-detail-activity';
import { RequestDetailAttachments } from '../request-detail-attachments';
import { RequestDetailHistory } from '../request-detail-history';
import { RequestDetailTaskList } from '../request-detail-task-list';

type RequestDetailTabProps = {
  data?: RequestDetail;
};

export const RequestDetailTab = ({
  data,
}: RequestDetailTabProps) => {
  return (
    <Card>
      <Tabs
        items={[
          {
            label: 'งาน',
            key: 'task',
            children: (
              <RequestDetailTaskList
                requestId={data?.requestID as string}
                stateId={data?.requestID as string}
              />
            ),
          },
          {
            label: 'ความคิดเห็น',
            key: 'activity',
            children: (
              <RequestDetailActivity
                requestId={data?.requestID as string}
              />
            ),
          },
          {
            label: 'ไฟล์แนบ',
            key: 'attach',
            children: (
              <RequestDetailAttachments
                requestId={data?.requestID as string}
              />
            ),
          },
          {
            label: 'ประวัติการทำงาน',
            key: 'history',
            children: (
              <RequestDetailHistory
                requestId={data?.requestID as string}
              />
            ),
          },
        ]}
      />
    </Card>
  );
};
