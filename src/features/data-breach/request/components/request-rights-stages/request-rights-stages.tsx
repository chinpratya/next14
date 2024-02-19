import { Flex } from '@mantine/core';
import { Button, Card } from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  RightsStageType,
  RightsStagesStyled,
  getRightsStages,
} from '../../../shared';
import { useUpdateRequestStepNext } from '../../api/update-request-step-next';
import { usePermission } from '@/hooks';
import { permissions } from '@/permissions';

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
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:request:update'],
    ],
  });

  const items = getRightsStages(stages ?? []);

  const nextStage = useUpdateRequestStepNext({
    requestId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.request.notifications
            .stepNextUpdate
        ) as string,
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
        <IntlMessage
          id={tokens.dataBreach.request.workflow}
        />
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
          disabled={!editPermission.isAllow}
        >
          <IntlMessage id={tokens.common.next} />
        </Button>
      </Flex>
    </Card>
  );
};
