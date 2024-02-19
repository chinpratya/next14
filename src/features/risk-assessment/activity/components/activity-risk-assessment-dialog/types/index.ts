import { PreviewTemplateOfRiskAssessmentType } from '../../../../template-risk';

export type ActivityRiskAssessmentDialogState = {
  assessmentId?: string | null;
  likelihoodValue?: number;
  effectValue?: Array<{
    effectID: string;
    value: number;
  }>;
  preview?: PreviewTemplateOfRiskAssessmentType;
  measure?: string[];
};

export type StepWidgetProps = {
  current?: number;
  state?: ActivityRiskAssessmentDialogState;
  onClose?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onChangeState?: (
    state: Record<string, unknown>
  ) => void;
  activityIds?: string[];
};
