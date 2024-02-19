import { Card, Col, FormInstance, Row } from 'antd';

import { getColLayout } from '@/utils';
import { IntlMessage } from '@utilComponents/intl-message';

import { PreferenceCentersBasicInfo } from '../preference-centers-basic-info';
import { PreferenceCentersOrganization } from '../preference-centers-organization';

type PreferenceCentersGeneralDataProps = {
  form: FormInstance;
};

export const PreferenceCentersGeneralData = ({
  form,
}: PreferenceCentersGeneralDataProps) => {
  return (
    <Row gutter={[16, 0]}>
      <Col {...getColLayout(12)}>
        <Card
          title={
            <IntlMessage id="consentManagement.preferenceCenters.detail.basicInfo.title" />
          }
        >
          <PreferenceCentersBasicInfo form={form} />
        </Card>
      </Col>
      <Col {...getColLayout(12)}>
        <Card
          title={
            <IntlMessage id="consentManagement.preferenceCenters.detail.organization.title" />
          }
        >
          <PreferenceCentersOrganization form={form} />
        </Card>
      </Col>
    </Row>
  );
};
