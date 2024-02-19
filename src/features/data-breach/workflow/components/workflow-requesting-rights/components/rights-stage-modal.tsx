import {
  FileDoneOutlined,
  FileSyncOutlined,
  HistoryOutlined,
  NodeExpandOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import { Flex } from '@mantine/core';
import {
  Collapse,
  Form,
  Input,
  Switch,
  Typography,
} from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { validation } from '@/utils';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { RightsStageType } from '../../../../shared';
import { useCreateWorkflowStage } from '../../../api/create-workflow-stage';
import { useUpdateWorkflowStage } from '../../../api/update-workflow-stage';

export type RightsStageModalProps = {
  workflowId: string;
  open: boolean;
  onClose: () => void;
  stage?: RightsStageType;
  lastedStateId?: string;
  order: number;
};

export const RightsStageModal = ({
  workflowId,
  open,
  onClose,
  stage,
  order,
  lastedStateId,
}: RightsStageModalProps) => {
  const { t } = useTranslation();
  const isEdit = Boolean(stage);
  const title = isEdit ? (
    <IntlMessage
      id={tokens.dataBreach.responsePlan.editWorkflow}
    />
  ) : (
    <IntlMessage
      id={tokens.dataBreach.responsePlan.addWorkflow}
    />
  );

  const { showNotification } = useNotifications();

  const createStage = useCreateWorkflowStage({
    workflowId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.responsePlan.notifications
            .addWorkflow
        ) as string,
      });
      onClose();
    },
  });

  const updateStage = useUpdateWorkflowStage({
    workflowId,
    stageId: stage?.stageID ?? '',
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.responsePlan.notifications
            .updateWorkflow
        ) as string,
      });
      onClose();
    },
  });

  const isLasted = stage?.stageID === lastedStateId;

  const [form] = Form.useForm();

  const handlePrimaryButton = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    if (!isEdit) {
      const payload = {
        ...values,
        order: order,
      };
      createStage.submit(payload);
    }
    if (isEdit) {
      updateStage.submit({
        ...stage,
        ...values,
      });
    }
  };

  useEffect(() => {
    if (stage) {
      form.setFieldsValue(stage);
    }
  }, [stage, form]);

  const isLoadingPrimaryButton =
    createStage.isLoading || updateStage.isLoading;

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      afterClose={form.resetFields}
      onOk={handlePrimaryButton}
      okButtonProps={{
        loading: isLoadingPrimaryButton,
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={
            <IntlMessage
              id={tokens.dataBreach.responsePlan.name}
            />
          }
          name="name"
          rules={[
            validation.required(
              t(
                tokens.dataBreach.responsePlan
                  .nameRequired
              )
            ),
          ]}
        >
          <Input
            placeholder={
              t(
                tokens.dataBreach.responsePlan
                  .namePlaceholder
              ) as string
            }
          />
        </Form.Item>

        <Collapse
          defaultActiveKey={['setting-stage']}
          className="mb-4"
        >
          <Collapse.Panel
            header={
              <IntlMessage id="dsarAutomation.setting.workflow.detail.workflow.stage" />
            }
            key="setting-stage"
          >
            {!isLasted ? (
              <>
                <Flex
                  align="center"
                  justify="space-between"
                  className="w-100 mb-4 mt-2"
                >
                  <Typography.Text>
                    <HistoryOutlined className="mr-4 text-primary font-size-md" />
                    <IntlMessage id="dsarAutomation.setting.workflow.detail.workflow.stage.isLasted" />
                  </Typography.Text>
                  <Form.Item
                    name="set_start_time"
                    valuePropName="checked"
                    noStyle
                  >
                    <Switch
                      checkedChildren={
                        <IntlMessage
                          id={tokens.common.on}
                        />
                      }
                      unCheckedChildren={
                        <IntlMessage
                          id={tokens.common.off}
                        />
                      }
                    />
                  </Form.Item>
                </Flex>
                <Flex
                  align="center"
                  justify="space-between"
                  className="w-100 mb-4"
                >
                  <Typography.Text>
                    <NodeExpandOutlined className="mr-4 text-primary font-size-md" />
                    <IntlMessage id="dsarAutomation.setting.workflow.detail.workflow.stage.autoComplete" />
                  </Typography.Text>
                  <Form.Item
                    name="auto_complete"
                    valuePropName="checked"
                    noStyle
                  >
                    <Switch
                      checkedChildren={
                        <IntlMessage
                          id={tokens.common.on}
                        />
                      }
                      unCheckedChildren={
                        <IntlMessage
                          id={tokens.common.off}
                        />
                      }
                    />
                  </Form.Item>
                </Flex>
              </>
            ) : (
              <Flex
                align="center"
                justify="space-between"
                className="w-100 mb-4"
              >
                <Typography.Text>
                  <ScheduleOutlined className="mr-4 text-primary font-size-md" />
                  <IntlMessage id="dsarAutomation.setting.workflow.detail.workflow.stage.autoCompleteLast" />
                </Typography.Text>
                <Form.Item
                  name="auto_complete"
                  valuePropName="checked"
                  noStyle
                >
                  <Switch
                    checkedChildren={
                      <IntlMessage
                        id={tokens.common.on}
                      />
                    }
                    unCheckedChildren={
                      <IntlMessage
                        id={tokens.common.off}
                      />
                    }
                  />
                </Form.Item>
              </Flex>
            )}
          </Collapse.Panel>
        </Collapse>
        <Collapse
          defaultActiveKey={['setting-notification']}
          className="mb-4"
        >
          <Collapse.Panel
            key="setting-notification"
            header={
              <IntlMessage id="dsarAutomation.setting.workflow.detail.workflow.notification" />
            }
          >
            <Flex
              align="center"
              justify="space-between"
              className="w-100 mb-4 mt-2"
            >
              <Typography.Text>
                <FileSyncOutlined className="mr-4 text-primary font-size-md" />
                <IntlMessage id="dsarAutomation.setting.workflow.detail.workflow.notification.sentEmailStart" />
              </Typography.Text>
              <Form.Item
                name="sent_email_if_start"
                valuePropName="checked"
                noStyle
              >
                <Switch
                  checkedChildren={
                    <IntlMessage id={tokens.common.on} />
                  }
                  unCheckedChildren={
                    <IntlMessage id={tokens.common.off} />
                  }
                />
              </Form.Item>
            </Flex>
            <Flex
              align="center"
              justify="space-between"
              className="w-100 mb-4"
            >
              <Typography.Text>
                <FileDoneOutlined className="mr-4 text-primary font-size-md" />
                <IntlMessage id="dsarAutomation.setting.workflow.detail.workflow.notification.sentEmailComplete" />
              </Typography.Text>
              <Form.Item
                name="sent_email_if_complete"
                valuePropName="checked"
                noStyle
              >
                <Switch
                  checkedChildren={
                    <IntlMessage id={tokens.common.on} />
                  }
                  unCheckedChildren={
                    <IntlMessage id={tokens.common.off} />
                  }
                />
              </Form.Item>
            </Flex>
          </Collapse.Panel>
        </Collapse>
      </Form>
    </Modal>
  );
};
