import { Tabs, Button, Form } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useGetWorkflow,
  useUpdateWorkflow,
  usePublishWorkFlow,
  WorkflowBasicInfo,
  WorkflowRequestingRights,
  useListWorkflowUser,
} from '@/features/dsar-automation';
import { PermissionWrapper } from '@/features/shared';
import { AppLayout } from '@/layouts';
import { permissions } from '@/permissions';
import {
  useNotifications,
  ValidateFailedNotificationError,
} from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const WorkFlowDetail = () => {
  const { t } = useTranslation();
  const {
    showNotification,
    showValidateFailedNotification,
  } = useNotifications();
  const router = useRouter();

  const [form] = Form.useForm();

  const workflowId = router.query.workflowId as string;

  const { data, isLoading, isError } =
    useGetWorkflow(workflowId);
  const user = useListWorkflowUser(workflowId);

  const updateWorkflow = useUpdateWorkflow({
    workflowId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.workflow.update'
        ) as string,
      });
    },
  });

  const publishWorkflow = usePublishWorkFlow({
    workflowId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.workflow.publish'
        ) as string,
      });
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        description: data.description,
        tagID: data.tagID,
      });
    }
  }, [data, form]);

  if (isLoading || user.isLoading) {
    return <Loading cover="content" />;
  }

  const tabList = [
    {
      label: (
        <IntlMessage id="dsarAutomation.setting.workflow.detail.basicInfo" />
      ),
      key: 'information',
      children: (
        <WorkflowBasicInfo
          workflowId={workflowId}
          form={form}
        />
      ),
    },
    {
      label: (
        <IntlMessage id="dsarAutomation.setting.workflow.detail.workflow" />
      ),
      key: 'workflow',
      children: (
        <WorkflowRequestingRights
          workflowId={workflowId}
          stages={data?.stages ?? []}
        />
      ),
    },
  ];

  const handleUpdateWorkflow = async () => {
    try {
      await form.validateFields();
      const values = await form.getFieldsValue();
      updateWorkflow.submit(values);
    } catch (error) {
      showValidateFailedNotification(
        error as ValidateFailedNotificationError
      );
    }
  };

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage id="dsarAutomation.setting.workflow.title" />
        }
        subtitle={data?.name}
        onBack={router.back}
        overlap
        extra={
          <PermissionWrapper
            moduleName={'dsar'}
            policies={[
              permissions['pdpakit:dsar:workflow:update'],
            ]}
          >
            <Button
              className="mr-2"
              onClick={() => publishWorkflow.submit()}
              loading={publishWorkflow.isLoading}
            >
              <IntlMessage id="dsarAutomation.setting.workflow.detail.publish" />
            </Button>
            <Button
              type="primary"
              onClick={handleUpdateWorkflow}
              loading={updateWorkflow.isLoading}
            >
              <IntlMessage id="dsarAutomation.setting.workflow.detail.save" />
            </Button>
          </PermissionWrapper>
        }
      />
      <Tabs items={tabList} />
    </FallbackError>
  );
};

WorkFlowDetail.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default WorkFlowDetail;
