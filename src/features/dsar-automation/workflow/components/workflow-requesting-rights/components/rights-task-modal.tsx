import { css } from '@emotion/css';
import { Form, Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useNotifications,
  ValidateFailedNotificationError,
} from '@/stores/notifications';
import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  TaskWidgetInfo,
  TaskWidgetAssignSetting,
  TaskWidgetNotification,
  TaskWidgetApi,
} from '../../../../task';
import { useCreateWorkFlowTask } from '../../../api/create-workflow-task';
import { useGetWorkflowTask } from '../../../api/get-workflow-task';
import { useUpdateWorkflowTask } from '../../../api/update-workflow-task';
import { WorkflowTask } from '../../../types';

export type RightsTaskModalProps = {
  workflowId: string;
  stageId: string;
  open: boolean;
  onClose: () => void;
  task?: WorkflowTask;
};

export const RightsTaskModal = ({
  workflowId,
  stageId,
  open,
  onClose,
  task,
}: RightsTaskModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const {
    showNotification,
    showValidateFailedNotification,
  } = useNotifications();

  const { data, isLoading, isError } = useGetWorkflowTask(
    {
      workflowId,
      stageId,
      taskId: task?.taskID ?? '',
    }
  );

  const createWorkFlowTask = useCreateWorkFlowTask({
    workflowId,
    stageId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.workflow.task.create'
        ) as string,
      });
      onClose();
    },
  });

  const updateWorkflowTask = useUpdateWorkflowTask({
    workflowId,
    stageId,
    taskId: task?.taskID ?? '',
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.workflow.task.update'
        ) as string,
      });
      onClose();
    },
  });

  const [activeTab, setActiveTab] =
    useState<string>('general');

  const isEdit = Boolean(task);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const title = isEdit ? (
    <IntlMessage id="dsarAutomation.setting.workflow.detail.task.edit" />
  ) : (
    <IntlMessage id="dsarAutomation.setting.workflow.detail.task.assign" />
  );

  const tabList: TabsProps['items'] = [
    {
      label: (
        <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo" />
      ),
      key: 'general',
      forceRender: true,
      children: (
        <>
          <TaskWidgetInfo workflowId={workflowId} />
          <TaskWidgetAssignSetting />
        </>
      ),
    },
    {
      label: (
        <IntlMessage id="dsarAutomation.request.detail.task.assign.notification" />
      ),
      key: 'notification',
      forceRender: true,
      children: (
        <TaskWidgetNotification workflowId={workflowId} />
      ),
    },
    {
      label: (
        <IntlMessage id="dsarAutomation.request.detail.task.assign.api" />
      ),
      forceRender: true,
      key: 'api',
      children: <TaskWidgetApi />,
    },
  ];

  const initialValues = {
    apiUrl: '',
    description: '',
    isAPI: false,
    requiredJob: false,
    resolutionEndJob: false,
    resolutionCloseJob: false,
    IdentifyTask: false,
    isSetNotificationTime: false,
    isCloseIfReject: false,
    isMailRelated: false,
    reminded: [],
  };

  const onOkButtonClick = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      console.log('valid', values);
      if (!isEdit) {
        createWorkFlowTask.submit({
          ...initialValues,
          ...values,
        });
      }
      if (isEdit) {
        updateWorkflowTask.submit({
          ...initialValues,
          ...data,
          ...values,
        });
      }
    } catch (error) {
      showValidateFailedNotification(
        error as ValidateFailedNotificationError
      );
    }
  };

  const isOkButtonLoading =
    createWorkFlowTask.isLoading ||
    updateWorkflowTask.isLoading;

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      onOk={onOkButtonClick}
      width={900}
      loading={isLoading}
      afterClose={() => {
        setActiveTab('general');
        form.resetFields();
      }}
      okButtonProps={{
        loading: isOkButtonLoading,
      }}
    >
      <FallbackError isError={isError}>
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
        >
          <Tabs
            className={css`
              .ant-tabs-content {
                min-height: calc(75vh - 85px);
              }
            `}
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key)}
            items={tabList}
          />
        </Form>
      </FallbackError>
    </Modal>
  );
};
