import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Select,
  Table,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import {
  useColumnFiltered,
  useFilter,
  usePagination,
  useSearch,
  useToggle,
} from '@/hooks';
import { tokens } from '@/lang';
import { InputSearch } from '@components/input-search';
import { renderDate } from '@components/show-tag-date';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useExportTask } from '../../api/export-task';
import { useGetTaskMeta } from '../../api/get-task-meta';
import { useListTask } from '../../api/list-task';
import { Task } from '../../types';
import { useTaskListRenders } from '../task-list-renders';
import { TaskModal } from '../task-modal';

export const TaskList = () => {
  const toggle = useToggle();

  const { debouncedSearch, search, onSearch } =
    useSearch();

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const [typeList, setTypeList] = useState('alltask');

  const { filters, columnFilter, filterDropdown } =
    useFilter<Task>();

  const exportTask = useExportTask({
    search: debouncedSearch,
    filters,
    onSuccess: (url) => {
      window.open(url, '_blank');
    },
  });

  const { data, isLoading, isError } = useListTask({
    search: debouncedSearch,
    approve: typeList,
    page,
    pageSize,
    filters,
  });

  const meta = useGetTaskMeta();

  const {
    taskIdRender,
    priorityRender,
    assignedRender,
    endDateRender,
    statusRender,
    conditionRender,
    eyeViewRender,
  } = useTaskListRenders<Task>({
    onEdit: (task) => toggle.edit(task),
  });

  const columns: ColumnsType<Task> = [
    {
      title: (
        <IntlMessage id="dsarAutomation.task.workId" />
      ),
      key: 'workID',
      width: 100,
      ellipsis: true,
      render: taskIdRender,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.task.typeOfRequest" />
      ),
      key: 'typeOfRequest',
      dataIndex: 'typeOfRequest',
      width: 150,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.task.priority" />
      ),
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      render: priorityRender,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.task.name" />
      ),
      key: 'name',
      width: 200,
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.task.stateName" />
      ),
      key: 'stateName',
      dataIndex: 'stateName',
      width: 200,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.task.assignName" />
      ),
      key: 'AssigneName',
      dataIndex: 'AssigneName',
      width: 200,
      ellipsis: true,
      render: assignedRender,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.task.endDate" />
      ),
      key: 'endDate',
      width: 330,
      ellipsis: true,
      render: endDateRender,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.task.startDate" />
      ),
      key: 'startDate',
      dataIndex: 'startDate',
      width: 200,
      render: renderDate,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.task.status" />
      ),
      key: 'AssigneStatus',
      dataIndex: 'AssigneStatus',
      width: 180,
      render: statusRender,
      ...columnFilter('filter'),
      filters: meta.data?.status?.map((assignStatus) => {
        return {
          text: assignStatus?.name,
          value: assignStatus?.ObjectUUID,
        };
      }),
      filterDropdown: filterDropdown('AssigneStatus'),
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.task.condition" />
      ),
      key: 'condition',
      width: 150,
      align: 'center',
      render: conditionRender,
    },
    {
      key: 'action',
      width: 50,
      align: 'center',
      fixed: 'right',
      render: eyeViewRender,
    },
  ];

  const taskTypesOptions = [
    {
      label: (
        <IntlMessage id="dsarAutomation.task.allTask" />
      ),
      value: 'alltask',
    },
    {
      label: (
        <IntlMessage id="dsarAutomation.task.myTask" />
      ),
      value: 'mytask',
    },
  ];

  const { filteredColumnsKeys, ColumnTransfer, xScroll } =
    useColumnFiltered({
      columns,
    });

  const filteredColumns = columns.filter((column) =>
    filteredColumnsKeys.includes(column.key as string)
  );

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <>
            <IntlMessage id="dsarAutomation.task.list" />
            <Typography.Text
              className="ml-2"
              style={{
                fontSize: 14,
                fontWeight: 'normal',
              }}
            >
              {data?.totalRecord ?? 0}{' '}
              <IntlMessage id={tokens.common.items} />
            </Typography.Text>
          </>
        }
        extra={
          <>
            <Select
              style={{ width: 150 }}
              value={typeList}
              onChange={(e) => setTypeList(e)}
              options={taskTypesOptions}
            />
            <InputSearch
              search={search}
              onSearch={onSearch}
              className="mx-2"
            />
            <Button
              icon={<UploadOutlined />}
              className="mr-2"
              onClick={() => exportTask.submit()}
              loading={exportTask.isLoading}
            >
              <IntlMessage id="dsarAutomation.task.export" />
            </Button>
            {ColumnTransfer}
          </>
        }
      >
        <Table
          rowKey="workID"
          tableLayout="fixed"
          scroll={{ x: xScroll }}
          columns={filteredColumns}
          dataSource={data?.data ?? []}
          loading={isLoading}
          pagination={false}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>
      <TaskModal
        open={toggle.openEdit}
        task={toggle?.data as Task}
        onClose={() => toggle.edit()}
      />
    </FallbackError>
  );
};
