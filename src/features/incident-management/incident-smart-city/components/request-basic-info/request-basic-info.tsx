import {
  Card,
  Col,
  Descriptions,
  FormInstance,
  Row,
} from 'antd';

import { getColLayout } from '@/utils';

import { RequestDetail } from '../../types';
import { RequestBasicInfoLanguage } from '../request-basic-info-language';
import { RequestBasicInfoManageAssign } from '../request-basic-info-manage-assign';
import { RequestBasicInfoTimeline } from '../request-basic-info-timeline';

type RequestBasicInfoProps = {
  form: FormInstance;
  data?: RequestDetail;
};

export const RequestBasicInfo = ({
  form,
  data,
}: RequestBasicInfoProps) => {
  return (
    <Row gutter={[16, 16]}>
      <Col {...getColLayout(12)}>
        <RequestBasicInfoManageAssign data={data} />
        <RequestBasicInfoLanguage
          form={form}
          requestId={data?.requestID as string}
        />
      </Col>
      <Col {...getColLayout(12)}>
        <Card title="ข้อมูลทั่วไป">
          <Descriptions column={1}>
            <Descriptions.Item label="ขั้นตอนการทำงาน">
              {data?.workflow ?? '-'}
            </Descriptions.Item>
            <Descriptions.Item label="เว็บฟอร์ม (เวอร์ชั่น)">
              {data?.workflowVersion ?? '-'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <RequestBasicInfoTimeline data={data} />
      </Col>
    </Row>
  );
};
