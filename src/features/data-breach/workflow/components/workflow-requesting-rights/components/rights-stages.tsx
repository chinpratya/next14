import { PlusOutlined } from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { Button, Card } from 'antd';
import { useTranslation } from 'react-i18next';

import { useToggle } from '@/hooks';
import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  RightsStageType,
  RightsStagesStyled,
  getRightsStages,
} from '../../../../shared';
import { useDeleteWorkflowStage } from '../../../api/delete-workflow-stage';

import { RightsStageModal } from './rights-stage-modal';

export type RightsStagesProps = {
  workflowId: string;
  stages: RightsStageType[];
  currentStage: number;
  onChangeCurrentStage: (stage: number) => void;
  permission?: boolean;
};

export const RightsStages = ({
  workflowId,
  stages,
  currentStage,
  onChangeCurrentStage,
  permission = true,
}: RightsStagesProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();

  const { showNotification } = useNotifications();

  const deleteStage = useDeleteWorkflowStage({
    workflowId,
    onSuccess: () => {
      toggle.remove(undefined);
      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.responsePlan.notifications
            .deleteWorkflow
        ) as string,
      });
    },
  });

  const stepItems = getRightsStages(
    stages,
    currentStage,
    toggle.edit,
    toggle.remove
  );

  const lastedStageId =
    stages?.[stages.length - 1]?.stageID ?? '';

  return (
    <Card
      title={
        <IntlMessage
          id={tokens.dataBreach.responsePlan.workflow}
        />
      }
    >
      <RightsStagesStyled
        direction="vertical"
        current={currentStage}
        items={stepItems}
        onChange={onChangeCurrentStage}
      />
      <Flex align="center" style={{ paddingTop: 16 }}>
        <Button
          type="primary"
          onClick={() => toggle.edit(undefined)}
          icon={<PlusOutlined />}
          disabled={!permission}
        >
          <IntlMessage
            id={
              tokens.dataBreach.responsePlan.addWorkflow
            }
          />
        </Button>
      </Flex>
      <DeleteModal
        title={
          <IntlMessage
            id={
              tokens.dataBreach.responsePlan
                .deleteWorkflow
            }
          />
        }
        open={toggle.openRemove}
        onCancel={toggle.remove}
        content={
          <IntlMessage
            id={
              tokens.dataBreach.responsePlan
                .contentWorkflow
            }
          />
        }
        hasIdentifier={false}
        onDelete={() =>
          deleteStage.submit(toggle.data.stageID)
        }
        okButtonProps={{
          loading: deleteStage.isLoading,
        }}
      />
      <RightsStageModal
        workflowId={workflowId}
        open={toggle.openEdit}
        onClose={toggle.edit}
        stage={toggle.data as RightsStageType}
        lastedStateId={lastedStageId}
        order={currentStage + 1}
      />
    </Card>
  );
};
