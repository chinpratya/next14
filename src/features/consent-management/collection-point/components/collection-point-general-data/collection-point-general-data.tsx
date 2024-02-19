import { Card, Col, FormInstance, Row } from 'antd';

import { getColLayout } from '@/utils';

import { CollectionPointBasicInfo } from '../collection-point-basic-info';
import { CollectionPointOrganization } from '../collection-point-organization';
import { CollectionPointPrivacyPolicy } from '../collection-point-privacy-policy';

type CollectionPointGeneralDataProps = {
  form: FormInstance;
};

export const CollectionPointGeneralData = ({
  form,
}: CollectionPointGeneralDataProps) => {
  return (
    <Row gutter={[16, 0]}>
      <Col {...getColLayout(12)}>
        <Card title="ข้อมูลทั่วไป">
          <CollectionPointBasicInfo form={form} />
        </Card>
        <Card title="องค์กร & ผู้ได้รับมอบหมาย">
          <CollectionPointOrganization form={form} />
        </Card>
      </Col>
      <Col {...getColLayout(12)}>
        <Card title="นโยบายความเป็นส่วนตัว">
          <CollectionPointPrivacyPolicy form={form} />
        </Card>
      </Col>
    </Row>
  );
};
