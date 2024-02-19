import { Flex } from '@mantine/core';
import { Button, Card } from 'antd';
import _ from 'lodash';

import { useNotifications } from '@/stores/notifications';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  RightsStageType,
  RightsStagesStyled,
  getRightsStages,
} from '../../../shared';
import { useUpdateRequestStepNext } from '../../api/update-request-step-next';

export type RightsStagesProps = {
  requestId: string;
  currentStageId: string;
  stages?: RightsStageType[];
  isHideNextButton?: boolean;
};

export const RequestRightsStages = ({
  requestId,
  currentStageId,
  stages = [],
  isHideNextButton = false,
}: RightsStagesProps) => {
  const { showNotification } = useNotifications();

  const items = getRightsStages(stages ?? []);

  const nextStage = useUpdateRequestStepNext({
    requestId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Update request step next success',
      });
    },
  });

  const currentStageIndex =
    _.findIndex(stages, {
      stateID: currentStageId,
    }) ?? 0;

  const isLatest =
    currentStageIndex === stages?.length - 1;

  return (
    <Card
      title={
        <IntlMessage id="dsarAutomation.request.detail.workflow" />
      }
    >
      <RightsStagesStyled
        current={currentStageIndex}
        direction="vertical"
        items={items}
      />
      <Flex className="mt-4" gap={8}>
        <Button
          hidden={isLatest || isHideNextButton}
          type="primary"
          onClick={() => nextStage.submit()}
          loading={nextStage.isLoading}
        >
          <IntlMessage id="dsarAutomation.request.detail.workflow.next" />
        </Button>
      </Flex>
    </Card>
  );
};
