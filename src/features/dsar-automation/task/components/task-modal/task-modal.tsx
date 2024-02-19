import { css } from '@emotion/css';
import {
  Form,
  FormInstance,
  Tabs,
  TabsProps,
  Typography,
} from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import {
  useNotifications,
  ValidateFailedNotificationError,
} from '@/stores/notifications';
import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useCreateTask } from '../../api/create-task';
import { useGetTask } from '../../api/get-task';
import { useUpdateTaskStatus } from '../../api/update-task-status';
import { Task } from '../../types';
import {
  TaskWidgetApi,
  TaskWidgetAssignSetting,
  TaskWidgetInfo,
  TaskWidgetNotification,
  TaskWidgetStatus,
  TaskWidgetRequest,
  TaskWidgetAttachment,
} from '../task-widgets';

export type TaskModalProps = {
  open: boolean;
  onClose: () => void;
  requestId?: string;
  stateId?: string;
  task?: Task;
  workflowID?: string;
  disabledRequest?: boolean;
};

const tabList = ({
  form,
  task,
  workflowId,
  requestId,
  disabledRequest,
  readOnly,
  status,
  isPermission,
}: {
  form: FormInstance;
  task?: Task;
  workflowId?: string;
  requestId?: string;
  disabledRequest?: boolean;
  readOnly?: boolean;
  status?: string;
  isPermission?: boolean;
}): TabsProps['items'] =>
  _.filter(
    [
      {
        label: (
          <IntlMessage id="dsarAutomation.request.detail.task.assign.basicInfo" />
        ),
        key: 'general',
        forceRender: true,
        children: (
          <>
            <TaskWidgetInfo
              readOnly={readOnly}
              workflowId={workflowId}
            />
            <TaskWidgetStatus
              form={form}
              isReadOnly={
                ['close', 'reject'].includes(
                  status as string
                ) || !isPermission
              }
            />
            {task ? (
              <TaskWidgetAttachment
                taskId={task?.workID ?? ''}
              />
            ) : null}
            <TaskWidgetAssignSetting
              readOnly={readOnly}
            />
          </>
        ),
      },
      {
        label: (
          <IntlMessage id="dsarAutomation.request.detail.task.assign.request" />
        ),
        key: 'request',
        forceRender: true,
        disabled: disabledRequest,
        children: (
          <TaskWidgetRequest
            requestId={requestId ?? ''}
          />
        ),
      },
      {
        label: (
          <IntlMessage id="dsarAutomation.request.detail.task.assign.notification" />
        ),
        key: 'notification',
        forceRender: true,
        children: (
          <TaskWidgetNotification
            readOnly={readOnly}
            workflowId={workflowId}
          />
        ),
      },
      {
        label: (
          <IntlMessage id="dsarAutomation.request.detail.task.assign.api" />
        ),
        forceRender: true,
        key: 'api',
        children: (
          <TaskWidgetApi
            taskId={task?.workID ?? ''}
            readOnly={readOnly}
          />
        ),
      },
    ],
    (item) => !item?.disabled
  );

export const TaskModal = ({
  open,
  onClose,
  requestId,
  stateId,
  task,
  disabledRequest,
  workflowID,
}: TaskModalProps) => {
  const { t } = useTranslation();

  const taskId = task?.workID as string;
  const isCreated = !taskId;

  const {
    showNotification,
    showValidateFailedNotification,
  } = useNotifications();

  const createTask = useCreateTask({
    requestId: requestId ?? '',
    stateId: stateId ?? '',
    onSuccess: () => {
      onClose?.();
      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.task.create'
        ) as string,
      });
    },
  });

  const updateTaskStatus = useUpdateTaskStatus({
    workId: taskId,
    onSuccess: () => {
      onClose?.();
      if (requestId && stateId) {
        queryClient.invalidateQueries([
          dsarAutomationQueryKeys.request.detail(
            requestId
          ),
        ]);
        queryClient.invalidateQueries([
          dsarAutomationQueryKeys.request.task(
            requestId,
            stateId
          ),
        ]);
      }
      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.task.update'
        ) as string,
      });
    },
  });

  const { data, isLoading, isError } = useGetTask(taskId);

  const [form] = Form.useForm();

  const [activeTab, setActiveTab] =
    useState<string>('general');

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
    reminded: [],
    status: 'open',
  };

  useEffect(() => {
    if (isCreated) {
      form.setFieldsValue(initialValues);
      return;
    }
    if (data && !isCreated) {
      const taskResolution =
        data?.taskResolution?.split('/');
      form.setFieldsValue(data);
      setTimeout(() => {
        form.setFieldsValue({
          taskResolution: [
            taskResolution?.[0] ?? '',
            taskResolution?.join('/') ?? '',
          ],
        });
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, form, isCreated]);

  const onSubmitTask = async () => {
    try {
      await form.validateFields();
      if (isCreated) {
        const values = form.getFieldsValue();
        const isSetNotificationTime =
          !!values?.reminded?.length;
        createTask.submit({
          ...values,
          isSetNotificationTime,
        });
        return;
      }
      const values = form.getFieldsValue([
        'status',
        'taskResolution',
        'massage',
      ]);
      const taskResolution =
        values?.taskResolution?.[1] ?? '';
      updateTaskStatus.submit({
        ...values,
        taskResolution,
      });
    } catch (error) {
      showValidateFailedNotification(
        error as ValidateFailedNotificationError
      );
    }
  };

  return (
    <Modal
      title={
        <>
          <IntlMessage id="dsarAutomation.request.detail.task.assign" />{' '}
          <Typography.Text type="secondary">
            {data?.name}
          </Typography.Text>
        </>
      }
      open={open}
      onCancel={onClose}
      width={900}
      afterClose={() => {
        setActiveTab('general');
        form.resetFields();
      }}
      loading={isLoading}
      onOk={onSubmitTask}
      okButtonProps={{
        loading:
          updateTaskStatus.isLoading ||
          createTask.isLoading,
        hidden: ['close', 'reject'].includes(
          data?.status as string
        ),
      }}
      destroyOnClose
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
            items={tabList({
              form,
              task,
              workflowId: data?.workflowID,
              requestId: data?.requestID,
              disabledRequest,
              readOnly: !isCreated,
              status: data?.status,
              isPermission: data?.isPermission,
            })}
          />
        </Form>
      </FallbackError>
    </Modal>
  );
};
