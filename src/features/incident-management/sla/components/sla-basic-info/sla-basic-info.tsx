import { css } from '@emotion/css';
import { Card, Descriptions, Divider } from 'antd';

import { Sla } from '../../types';

import { ComplianceDetail } from './compliance-detail';
import { CustomDetail } from './custom-detail';

type SlaBasicInfoProps = {
  sla?: Sla;
};

export const SlaBasicInfo = ({
  sla,
}: SlaBasicInfoProps) => {
  let detail = <CustomDetail />;

  return (
    <Card
      title={'ระยะเวลาในการดำเนินการของใบงาน'}
      className={css`
        height: 100%;
      `}
    >
      <Descriptions
        column={{
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        layout="vertical"
      >
        <Descriptions.Item label="ข้อมูล SLA">
          {sla?.name}
        </Descriptions.Item>
        <Descriptions.Item label="ระดับความรุนแรง">
          {sla?.name}
        </Descriptions.Item>
        <Descriptions.Item label="คำอธิบาย">
          {sla?.name}
        </Descriptions.Item>
        <Descriptions.Item label="ระยะเวลาการทำงาน">
          {sla?.name}
        </Descriptions.Item>
        <Descriptions.Item label="ระยะเวลาในการตอบสนอง">
          {sla?.name}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <div>{detail}</div>
    </Card>
  );
};
