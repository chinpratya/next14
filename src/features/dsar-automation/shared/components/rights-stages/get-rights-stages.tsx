import { RightsStageType } from '../../types';

import { RightsStageItem } from './rights-stages-item';

export const getRightsStages = (
  stages: RightsStageType[],
  currentStage?: number,
  onEdit?: (stage: RightsStageType) => void,
  onDelete?: (stage: RightsStageType) => void
) => {
  const currentState = stages?.[currentStage ?? 0];
  const currentStateId =
    currentState?.stageID ?? currentState?.stateID ?? '';

  const lastStage = stages?.[stages.length - 1];
  const lastStageId =
    lastStage?.stageID ?? lastStage?.stateID ?? '';

  return stages.map((stage) => {
    const isCurrent =
      stage.stageID === currentStateId ||
      stage.stateID === currentStateId;
    const isLasted =
      stage.stageID === lastStageId ||
      stage.stateID === lastStageId;

    return {
      title: (
        <RightsStageItem
          stage={stage}
          isCurrent={isCurrent}
          isLasted={isLasted}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    };
  });
};
