import { useCounter } from '@mantine/hooks';
import { Button, Form } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  WorkflowCreate,
  useCreateWorkFlow,
  useAddWorkflowUser,
} from '@/features/dsar-automation';
import { AppLayout } from '@/layouts';
import { useNotifications } from '@/stores/notifications';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const WorkflowCreatePage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();

  const { showNotification } = useNotifications();

  const [current, handleCurrent] = useCounter(0, {
    max: 1,
    min: 0,
  });

  const [workflowId, setWorkflowId] = useState<
    string | undefined
  >();
  const [selectUsers, setSelectUsers] = useState<
    string[]
  >([]);

  const onSelectUsers = (selectedRowKeys: string[]) =>
    setSelectUsers(selectedRowKeys);

  const createWorkFlow = useCreateWorkFlow({
    onSuccess: ({ ObjectUUID }) => {
      handleCurrent.increment();
      setWorkflowId(ObjectUUID);
      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.workflow.create'
        ) as string,
      });
    },
  });

  const addWorkflowUser = useAddWorkflowUser({
    workflowId: workflowId ?? '',
    onSuccess: () => {
      router.back();
      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.workflow.user.add'
        ) as string,
      });
    },
  });

  const handlePrimaryButtonClick = async () => {
    if (current === 0) {
      await form.validateFields();
      const values = form.getFieldsValue();
      createWorkFlow.submit(values);
    }
    if (current === 1) {
      addWorkflowUser.submit(selectUsers);
    }
  };

  const isPrimaryButtonLoading =
    createWorkFlow.isLoading || addWorkflowUser.isLoading;

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dsarAutomation.setting.workflow.create" />
        }
        onBack={router.back}
        extra={
          <>
            <Button onClick={router.back}>
              <IntlMessage id="dsarAutomation.setting.workflow.cancel" />
            </Button>
            <Button
              type="primary"
              onClick={handlePrimaryButtonClick}
              loading={isPrimaryButtonLoading}
            >
              {current === 0 ? (
                <IntlMessage id="dsarAutomation.setting.workflow.next" />
              ) : (
                <IntlMessage id="dsarAutomation.setting.workflow.save" />
              )}
            </Button>
          </>
        }
      />
      <WorkflowCreate
        form={form}
        current={current}
        selectUsers={selectUsers}
        onSelectUsers={onSelectUsers}
      />
    </>
  );
};

WorkflowCreatePage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default WorkflowCreatePage;
