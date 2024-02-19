import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Table,
  Tag,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';

import { Flex } from '@/components/share-components/flex';
import {
  useColumnFiltered,
  usePagination,
  useToggle,
} from '@/hooks';
import { tokens } from '@/lang';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useTaskListRenders } from '../../../../task';
import { useDeleteWorkflowTask } from '../../../api/delete-workflow-task';
import { useListWorkflowTask } from '../../../api/list-workflow-task';
import { WorkflowTask } from '../../../types';

import { RightsTaskModal } from './rights-task-modal';

export type RightsTasksProps = {
  workflowId: string;
  stageId: string;
  permission?: boolean;
};

export const RightsTasks = ({
  workflowId,
  stageId,
  permission = true,
}: RightsTasksProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const toggle = useToggle<WorkflowTask>();

  const { data, isError, isLoading } =
    useListWorkflowTask({
      workflowId,
      stageId: stageId,
      page,
      pageSize,
    });

  const deleteTask = useDeleteWorkflowTask({
    workflowId,
    stateId: stageId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          tokens.dataBreach.responsePlan.notifications
            .deleteTask
        ) as string,
      });
      toggle.remove();
    },
  });

  const {
    taskIdRender,
    priorityRender,
    conditionRender,
    actionDropdownRender,
    assignedRender,
  } = useTaskListRenders<WorkflowTask>({
    rowKey: 'taskID',
    onEdit: (task) => toggle.edit(task),
    onDelete: (task) => toggle.remove(task),
    editPermissions: permission,
    deletePermissions: permission,
  });

  const columns: ColumnsType<WorkflowTask> = [
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.responsePlan.taskId}
        />
      ),
      key: 'taskID',
      ellipsis: true,
      width: 100,
      render: taskIdRender,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.responsePlan.priority}
        />
      ),
      key: 'priority',
      dataIndex: 'priority',
      width: 80,
      ellipsis: true,
      render: priorityRender,
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.responsePlan.taskName}
        />
      ),
      key: 'name',
      width: 150,
      ellipsis: true,
      render: (task: WorkflowTask) => (
        <Flex>
          <Typography
            hidden={!task.requiredJob}
            style={{ color: 'red', marginRight: '5px' }}
          >
            *
          </Typography>
          <Typography>{task.name}</Typography>
        </Flex>
      ),
    },
    {
      title: (
        <IntlMessage
          id={tokens.dataBreach.responsePlan.delegate}
        />
      ),
      key: 'delegateName',
      dataIndex: 'delegateName',
      width: 150,
      ellipsis: true,
      render: assignedRender,
    },
    {
      title: (
        <IntlMessage
          id={
            tokens.dataBreach.responsePlan.workingPeriod
          }
        />
      ),
      key: 'endDate',
      dataIndex: 'endDate',
      width: 150,
      ellipsis: true,
      render: (endDate) => (
        <Tag>
          {endDate?.value} {endDate?.type}
        </Tag>
      ),
    },
    {
      key: 'feature',
      width: 140,
      render: conditionRender,
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: actionDropdownRender,
    },
  ];

  const { ColumnTransfer, filteredColumns, xScroll } =
    useColumnFiltered({
      columns,
    });

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage
            id={tokens.dataBreach.responsePlan.task}
          />
        }
        extra={
          <>
            <Button
              type="primary"
              onClick={() => toggle.create()}
              icon={<PlusOutlined />}
              className="mr-2"
              disabled={!permission}
            >
              <IntlMessage
                id={
                  tokens.dataBreach.responsePlan
                    .assignTask
                }
              />
            </Button>
            {ColumnTransfer}
          </>
        }
      >
        <Table
          rowKey="taskID"
          loading={isLoading}
          columns={filteredColumns}
          dataSource={data?.data}
          tableLayout="fixed"
          scroll={{ x: xScroll }}
          pagination={false}
        />
        <Pagination
          current={page}
          total={10}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <DeleteModal
          open={toggle.openRemove}
          onCancel={() => toggle.remove()}
          identifier={toggle.data?.name}
          onDelete={() =>
            deleteTask.submit(toggle.data?.taskID)
          }
          okButtonProps={{
            loading: deleteTask.isLoading,
          }}
        />
      </Card>
      <RightsTaskModal
        workflowId={workflowId}
        stageId={stageId}
        open={toggle.openCreate || toggle.openEdit}
        onClose={() => toggle.resetAll()}
        task={toggle.data}
        permission={permission}
      />
    </FallbackError>
  );
};
