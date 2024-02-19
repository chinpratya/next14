import {
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Card, Table } from 'antd';
import { useTranslation } from 'react-i18next';

import { usePermission, useToggle } from '@/hooks';
import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteWorkflowUser } from '../../api/delete-workflow-user';
import { useListWorkflowUser } from '../../api/list-workflow-user';
import { WorkflowUser } from '../../types';

import { AddWorkflowUserModal } from './components/add-workflow-user-modal';

export type WorkflowUserListProps = {
  workflowId: string;
  permission?: boolean;
};

export const WorkflowUserList = ({
  workflowId,
  permission = true,
}: WorkflowUserListProps) => {
  const { t } = useTranslation();
  const toggle = useToggle<WorkflowUser>();
  const { showNotification } = useNotifications();

  const { data, isLoading, isError } =
    useListWorkflowUser(workflowId);

  const deleteWorkflowUser = useDeleteWorkflowUser({
    workflowId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.responsePlan.notifications
            .deleteUser
        ) as string,
      });
      toggle.remove();
    },
  });

  const columns = [
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.responsePlan.name}
        />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 200,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.responsePlan.email}
        />
      ),
      dataIndex: 'position',
      key: 'position',
      width: 200,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.responsePlan.organization}
        />
      ),
      dataIndex: 'organization',
      key: 'department',
      width: 200,
      ellipsis: true,
      render: (organization: string[]) =>
        organization.join(', '),
    },
    {
      key: 'action',
      render: (record: WorkflowUser) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id={tokens.common.delete} />
              ),
              key: 'remove',
              icon: <DeleteOutlined />,
              onClick: () => {
                toggle.remove(record);
              },
              disabled: !permission,
            },
          ]}
        />
      ),
    },
  ];

  const alreadySelectedUserIds = data?.data.map(
    (user) => user.userID
  );

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage
            id={tokens.dataBreach.responsePlan.user}
          />
        }
        style={{ minHeight: 'calc(100% - 20px)' }}
        extra={
          <Button
            icon={<PlusCircleOutlined />}
            onClick={() => toggle.create()}
            type="primary"
            disabled={!permission}
          >
            <IntlMessage
              id={
                tokens.dataBreach.responsePlan.selectUser
              }
            />
          </Button>
        }
      >
        <Table
          rowKey="userID"
          loading={isLoading}
          dataSource={data?.data}
          columns={columns}
          tableLayout="fixed"
          scroll={{ x: 600 }}
        />
      </Card>
      <AddWorkflowUserModal
        workflowId={workflowId}
        alreadySelectedUserIds={alreadySelectedUserIds}
        open={toggle.openCreate}
        onClose={toggle.create}
      />
      <DeleteModal
        open={toggle.openRemove}
        onCancel={() => toggle.remove()}
        onDelete={() =>
          deleteWorkflowUser.submit(
            toggle.data?.userID as string
          )
        }
        identifier={toggle.data?.name as string}
        okButtonProps={{
          loading: deleteWorkflowUser.isLoading,
        }}
      />
    </FallbackError>
  );
};
