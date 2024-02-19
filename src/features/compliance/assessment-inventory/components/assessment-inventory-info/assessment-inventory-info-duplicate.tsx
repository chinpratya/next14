import { css } from '@emotion/css';
import { Row, Col, FormInstance } from 'antd';

import { AssessmentInventory } from '../../types';

import { BaseInfoContent } from './base-info-content';
import { DescriptionContent } from './description-content';
import { DocumentationDuplicateContent } from './documentation-duplicate-content';

type AssessmentInventoryInfoDuplicateProps = {
  form: FormInstance;
  data: AssessmentInventory | null;
  isLoading: boolean;
};
export const AssessmentInventoryInfoDuplicate = ({
  form,
  data,
  isLoading,
}: AssessmentInventoryInfoDuplicateProps) => {
  return (
    <Row justify={'space-around'}>
      <BaseInfoContent
        data={data ?? null}
        form={form}
        loading={isLoading}
      />
      <Col
        className={css`
          width: 45%;
        `}
      >
        <DescriptionContent
          data={data ?? null}
          loading={isLoading}
        />
        <DocumentationDuplicateContent
          data={data ?? null}
          form={form}
          loading={isLoading}
        />
      </Col>
    </Row>
  );
};
