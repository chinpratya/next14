import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import {
  useColumnFiltered,
  usePagination,
  usePermission,
  useToggle,
} from '@/hooks';
import { renderDate } from '@components/show-tag-date';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  useTaskListRenders,
  TaskModal,
} from '../../../task';
import { useListRequestTask } from '../../api/list-request-task';
import { RequestTask } from '../../types';
import { permissions } from '@/permissions';

export type RequestTaskListProps = {
  requestId: string;
  workflowID?: string;
  stateId: string;
};

export const RequestTaskList = ({
  requestId,
  stateId,
  workflowID,
}: RequestTaskListProps) => {
  const toggle = useToggle();

  const { data, isLoading, isError } = useListRequestTask(
    requestId,
    stateId
  );

  const editPermission = usePermission({
    moduleName: 'databreach',
    policies: [
      permissions['pdpakit:databreach:request:update'],
    ],
  });

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const {
    taskIdRender,
    priorityRender,
    assignedRender,
    endDateRender,
    statusRender,
    conditionRender,
    eyeViewRender,
  } = useTaskListRenders<RequestTask>({
    onEdit: (task) => toggle.edit(task),
  });

  const columns: ColumnsType<RequestTask> = [
    {
      title: (
        <IntlMessage id="dsarAutomation.request.detail.task.workId" />
      ),
      key: 'workID',
      width: 100,
      ellipsis: true,
      render: taskIdRender,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.request.detail.task.priority" />
      ),
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      render: priorityRender,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.request.detail.task.name" />
      ),
      key: 'name',
      width: 200,
      ellipsis: true,
      render: (requestTask: RequestTask) =>
        requestTask.requiredJob ? (
          <Typography.Text>
            <Typography.Text
              style={{ color: 'red' }}
              className="mr-1"
            >
              *
            </Typography.Text>
            {requestTask.name}
          </Typography.Text>
        ) : (
          <Typography.Text>
            {requestTask.name}
          </Typography.Text>
        ),
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.request.detail.task.assignName" />
      ),
      key: 'AssigneName',
      dataIndex: 'AssigneName',
      width: 200,
      ellipsis: true,
      render: assignedRender,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.request.detail.task.endDate" />
      ),
      key: 'endDate',
      width: 330,
      ellipsis: true,
      render: endDateRender,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.request.detail.task.startDate" />
      ),
      key: 'startDate',
      dataIndex: 'startDate',
      width: 200,
      render: renderDate,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.request.detail.task.status" />
      ),
      key: 'AssigneStatus',
      dataIndex: 'AssigneStatus',
      width: 180,
      render: statusRender,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.request.detail.task.condition" />
      ),
      key: 'condition',
      width: 150,
      align: 'center',
      render: conditionRender,
    },
    {
      key: 'eyeView',
      width: 50,
      align: 'center',
      render: eyeViewRender,
    },
  ];

  const { filteredColumns, ColumnTransfer, xScroll } =
    useColumnFiltered({
      columns,
    });

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="dsarAutomation.request.detail.task.title" />
        }
        bordered={false}
        extra={
          <>
            <Button
              onClick={() => toggle.create()}
              className="mr-2"
              type="primary"
              icon={<PlusOutlined />}
              disabled={!editPermission.isAllow}
            >
              <IntlMessage id="dsarAutomation.request.detail.task.assign" />
            </Button>
            {ColumnTransfer}
          </>
        }
      >
        <Table
          rowKey="workID"
          tableLayout="fixed"
          scroll={{
            x: xScroll,
          }}
          columns={filteredColumns}
          dataSource={data?.data ?? []}
          loading={isLoading}
          pagination={false}
        />
        <Pagination
          current={page}
          pageSize={pageSize}
          total={data?.totalRecord}
          onChange={onPaginationChange}
        />
      </Card>
      <TaskModal
        requestId={requestId}
        stateId={stateId}
        open={toggle.openEdit || toggle.openCreate}
        onClose={() => toggle.resetAll()}
        task={toggle?.data as RequestTask}
        disabledRequest
        workflowID={workflowID}
        permissionEdit={editPermission.isAllow}
      />
    </FallbackError>
  );
};
