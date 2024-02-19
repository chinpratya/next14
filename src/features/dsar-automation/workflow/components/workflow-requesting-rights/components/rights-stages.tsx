import { PlusOutlined } from '@ant-design/icons';
import { Flex } from '@mantine/core';
import { Button, Card } from 'antd';
import { useTranslation } from 'react-i18next';

import { usePermission, useToggle } from '@/hooks';
import { permissions } from '@/permissions';
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
};

export const RightsStages = ({
  workflowId,
  stages,
  currentStage,
  onChangeCurrentStage,
}: RightsStagesProps) => {
  const { t } = useTranslation();
  const toggle = useToggle();

  const editPermission = usePermission({
    moduleName: 'dsar',
    policies: [
      permissions['pdpakit:dsar:workflow:update'],
    ],
  });

  const { showNotification } = useNotifications();

  const deleteStage = useDeleteWorkflowStage({
    workflowId,
    onSuccess: () => {
      toggle.remove(undefined);
      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.workflow.stage.delete'
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
  console.log('stepItems', stepItems);

  const lastedStageId =
    stages?.[stages.length - 1]?.stageID ?? '';

  return (
    <Card
      title={
        <IntlMessage id="dsarAutomation.setting.workflow.detail.workflow" />
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
          disabled={!editPermission.isAllow}
        >
          <IntlMessage id="dsarAutomation.setting.workflow.detail.workflow.add" />
        </Button>
      </Flex>
      <DeleteModal
        title={
          <IntlMessage id="dsarAutomation.setting.workflow.detail.workflow.delete" />
        }
        open={toggle.openRemove}
        onCancel={toggle.remove}
        content={
          <IntlMessage id="dsarAutomation.setting.workflow.detail.workflow.delete.desc" />
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
