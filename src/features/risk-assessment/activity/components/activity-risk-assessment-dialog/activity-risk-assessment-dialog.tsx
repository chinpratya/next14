import { useCounter, useSetState } from '@mantine/hooks';
import { Divider, Steps } from 'antd';

import { tokens } from '@/lang';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { RiskAssessmentEffect } from './components/risk-assessment-effect';
import { RiskAssessmentLikelihood } from './components/risk-assessment-likelihood';
import { RiskAssessmentManagement } from './components/risk-assessment-management';
import { RiskAssessmentPreview } from './components/risk-assessment-preview';
import { RiskAssessmentTemplateSelect } from './components/risk-assessment-template-select';
import {
  ActivityRiskAssessmentDialogState,
  StepWidgetProps,
} from './types';

export type ActivityRiskAssessmentDialogProps = {
  open?: boolean;
  onClose?: () => void;
  activityIds?: string[];
};

const steps = [
  {
    title: (
      <IntlMessage
        id={tokens.riskAssessment.activity.selectTemplate}
      />
    ),
  },
  {
    title: (
      <IntlMessage
        id={tokens.riskAssessment.activity.likelihood}
      />
    ),
  },
  {
    title: (
      <IntlMessage
        id={tokens.riskAssessment.activity.effect}
      />
    ),
  },
  {
    title: (
      <IntlMessage
        id={tokens.riskAssessment.activity.summary}
      />
    ),
  },
  {
    title: (
      <IntlMessage
        id={tokens.riskAssessment.activity.manageRisk}
      />
    ),
  },
];

export const ActivityRiskAssessmentDialog = ({
  open,
  onClose,
  activityIds = [],
}: ActivityRiskAssessmentDialogProps) => {
  const [current, handler] = useCounter(0, {
    min: 0,
    max: 4,
  });

  const initialState = {
    assessmentId: null,
    likelihoodValue: undefined,
    effectValue: undefined,
    preview: undefined,
    measure: [],
  };

  const [state, setState] =
    useSetState<ActivityRiskAssessmentDialogState>(
      initialState
    );

  const stepsRender = (current: number) => {
    const props = {
      current,
      onClose,
      state,
      onNext: handler.increment,
      onPrev: handler.decrement,
      onChangeState: setState,
      activityIds,
    } as StepWidgetProps;

    return {
      0: <RiskAssessmentTemplateSelect {...props} />,
      1: <RiskAssessmentLikelihood {...props} />,
      2: <RiskAssessmentEffect {...props} />,
      3: <RiskAssessmentPreview {...props} />,
      4: <RiskAssessmentManagement {...props} />,
    }[current];
  };

  return (
    <Modal
      title={
        current === 0 ? (
          <IntlMessage
            id={
              tokens.riskAssessment.activity
                .selectRiskTemplate
            }
          />
        ) : (
          <IntlMessage
            id={
              tokens.riskAssessment.activity
                .riskAssessment
            }
          />
        )
      }
      open={open}
      onCancel={onClose}
      width="75vw"
      bodyPadding={0}
      footer={null}
      afterClose={() => {
        setState({
          ...initialState,
        });
        handler.set(0);
      }}
    >
      <Steps
        className="p-4"
        current={current}
        items={steps}
      />
      <Divider className="m-0" />
      {stepsRender(current)}
    </Modal>
  );
};
