import { Col, Row } from 'antd';

import { getColLayout } from '@/utils';

import { RequestDetail } from '../../types';
import { RequestDetailChangeStatus } from '../request-detail-change-status';
import { RequestDetailDetail } from '../request-detail-detail';
import { RequestDetailReply } from '../request-detail-reply';
import { RequestDetailTab } from '../request-detail-tab';

type RequestDetailsProps = {
  data?: RequestDetail;
  currentState?: number;
};

export const RequestDetails = ({
  data,
}: RequestDetailsProps) => {
  return (
    <Row gutter={[16, 16]}>
      <Col {...getColLayout(16)}>
        <RequestDetailDetail data={data} />
        {/* <RequestDetailStep
          requestId={data?.requestID as string}
          currecntState={currecntState}
          states={data?.states ?? []}
        /> */}
        <RequestDetailTab data={data} />
      </Col>
      <Col {...getColLayout(8)}>
        <RequestDetailChangeStatus
          data={data}
          requestId={data?.requestID as string}
        />
        <RequestDetailReply
          requestId={data?.requestID as string}
        />
      </Col>
    </Row>
  );
};
