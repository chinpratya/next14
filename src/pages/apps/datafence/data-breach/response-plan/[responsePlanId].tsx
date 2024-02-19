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
} from '@/features/data-breach';
import { tokens } from '@/lang';
import { AppLayout } from '@/layouts';
import {
  useNotifications,
  ValidateFailedNotificationError,
} from '@/stores/notifications';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';
import { PermissionWrapper } from '@/features/shared';
import { permissions } from '@/permissions';
import { usePermission } from '@/hooks';

const WorkFlowDetail = () => {
  const { t } = useTranslation();
  const {
    showNotification,
    showValidateFailedNotification,
  } = useNotifications();
  const router = useRouter();

  const [form] = Form.useForm();

  const responsePlanId = router.query
    .responsePlanId as string;

  const { data, isLoading, isError } =
    useGetWorkflow(responsePlanId);
  const user = useListWorkflowUser(responsePlanId);

  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions[
        'pdpakit:databreach:responseplan:update'
      ],
    ],
  });

  const updateWorkflow = useUpdateWorkflow({
    workflowId: responsePlanId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.responsePlan.notifications
            .update
        ) as string,
      });
    },
  });

  const publishWorkflow = usePublishWorkFlow({
    workflowId: responsePlanId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.responsePlan.notifications
            .publish
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
        <IntlMessage
          id={tokens.dataBreach.responsePlan.basicInfo}
        />
      ),
      key: 'information',
      children: (
        <WorkflowBasicInfo
          workflowId={responsePlanId}
          form={form}
          permissions={editPermission.isAllow}
        />
      ),
    },
    {
      label: (
        <IntlMessage
          id={tokens.dataBreach.responsePlan.workflow}
        />
      ),
      key: 'workflow',
      children: (
        <WorkflowRequestingRights
          workflowId={responsePlanId}
          stages={
            data?.stages.map((value) => {
              return {
                ...value,
                disabled: !editPermission.isAllow,
              };
            }) ?? []
          }
          permissions={editPermission.isAllow}
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
          <IntlMessage
            id={tokens.dataBreach.responsePlan.detail}
          />
        }
        subtitle={data?.name}
        onBack={router.back}
        overlap
        extra={
          <PermissionWrapper
            moduleName={'databreach'}
            policies={[
              permissions[
                'pdpakit:databreach:responseplan:update'
              ],
            ]}
          >
            <Button
              onClick={() => publishWorkflow.submit()}
              loading={publishWorkflow.isLoading}
            >
              <IntlMessage id={tokens.common.publish} />
            </Button>
            <Button
              type="primary"
              onClick={handleUpdateWorkflow}
              loading={updateWorkflow.isLoading}
            >
              <IntlMessage id={tokens.common.save} />
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
