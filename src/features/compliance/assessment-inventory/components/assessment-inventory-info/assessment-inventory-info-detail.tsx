import { Row, Col, FormInstance } from 'antd';

import { getColLayout } from '@/utils';

import { AssessmentInventory } from '../../types';

import { BaseInfoContent } from './base-info-content';
// import { DescriptionContent } from './description-content';
// import { DocumentationDetailContent } from './documentation-detail-content';

type AssessmentInventoryInfoProps = {
  // assessmentId: string;
  form: FormInstance;
  data: AssessmentInventory | null;
  isLoading: boolean;
};
export const AssessmentInventoryInfoDetail = ({
  // assessmentId,
  form,
  data,
  isLoading,
}: AssessmentInventoryInfoProps) => {
  return (
    <Row gutter={[24, 24]}>
      <Col {...getColLayout(12)}>
        <BaseInfoContent
          data={data ?? null}
          form={form}
          loading={isLoading}
        />
      </Col>
      {/* <Col {...getColLayout(12)}>
        <DescriptionContent
          data={data ?? null}
          loading={isLoading}
        />
        <DocumentationDetailContent
          data={data ?? null}
          form={form}
          assessmentId={assessmentId}
          loading={isLoading}
        />
      </Col> */}
    </Row>
  );
};
