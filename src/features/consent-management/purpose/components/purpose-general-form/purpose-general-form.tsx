import { Col, Row, FormInstance } from 'antd';

import { getColLayout } from '@/utils';

import { ConsentPurposeDetail } from '../../types';

import {
  PurposeGeneralFormGeneralData,
  PurposeGeneralFormOrganization,
  PurposeGeneralFormGroup,
  PurposeGeneralFormPeriodDataUsage,
  PurposeGeneralFormStatus,
} from './components';

type PurposeGeneralFormProps = {
  form: FormInstance;
  purposeId?: string;
  data?: ConsentPurposeDetail;
};
export const PurposeGeneralForm = ({
  form,
  purposeId,
  data,
}: PurposeGeneralFormProps) => {
  return (
    <>
      <Row gutter={[10, 10]}>
        <Col {...getColLayout([24, 24, 12, 12, 12, 12])}>
          <PurposeGeneralFormGeneralData form={form} />
          <PurposeGeneralFormPeriodDataUsage
            form={form}
            dataIsDataUsagePeriod={
              data?.isDataUsagePeriod
            }
          />
        </Col>
        <Col {...getColLayout([24, 24, 12, 12, 12, 12])}>
          <PurposeGeneralFormOrganization form={form} />
          <PurposeGeneralFormGroup form={form} />
          {purposeId && (
            <PurposeGeneralFormStatus form={form} />
          )}
        </Col>
      </Row>
    </>
  );
};
