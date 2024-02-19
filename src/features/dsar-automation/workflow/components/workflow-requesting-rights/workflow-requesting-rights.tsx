import { Col, Row } from 'antd';
import { useState } from 'react';

import { getColLayout } from '@/utils';

import {
  RightsStages,
  RightsStagesProps,
} from './components/rights-stages';
import { RightsTasks } from './components/rights-tasks';

export type WorkflowRequestingRightsProps = Pick<
  RightsStagesProps,
  'stages'
> & {
  workflowId: string;
};

export const WorkflowRequestingRights = ({
  workflowId,
  stages,
}: WorkflowRequestingRightsProps) => {
  const [currentStage, setCurrentStage] =
    useState<number>(0);

  const onChangeCurrentStage = (stage: number) => {
    setCurrentStage(stage);
  };

  const currentStageId =
    stages[currentStage]?.stageID ?? '';

  return (
    <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
      <Col {...getColLayout(6)}>
        <RightsStages
          workflowId={workflowId}
          stages={stages}
          currentStage={currentStage}
          onChangeCurrentStage={onChangeCurrentStage}
        />
      </Col>
      <Col {...getColLayout(18)}>
        <RightsTasks
          workflowId={workflowId}
          stageId={currentStageId}
        />
      </Col>
    </Row>
  );
};
