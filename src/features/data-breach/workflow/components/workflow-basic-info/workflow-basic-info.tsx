import { Col, FormInstance, Row } from 'antd';

import { getColLayout } from '@/utils';

import { WorkflowGeneralData } from '../workflow-general-data';
import { WorkflowUserList } from '../workflow-user-list';

export type WorkflowBasicInfoProps = {
  workflowId: string;
  form?: FormInstance;
  permissions?: boolean;
};

export const WorkflowBasicInfo = ({
  workflowId,
  form,
  permissions = true,
}: WorkflowBasicInfoProps) => {
  return (
    <Row gutter={[24, 24]}>
      <Col {...getColLayout(12)}>
        <WorkflowGeneralData
          form={form}
          permissions={permissions}
        />
      </Col>
      <Col {...getColLayout(12)}>
        <WorkflowUserList
          workflowId={workflowId}
          permission={permissions}
        />
      </Col>
    </Row>
  );
};
