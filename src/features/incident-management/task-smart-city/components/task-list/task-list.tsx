import {
  DownloadOutlined,
  EyeOutlined,
} from '@ant-design/icons';
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
  usePagination,
  useSearch,
  useToggle,
} from '@/hooks';
import { DropdownTable } from '@components/dropdown-table';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';

import { useListTask } from '../../api/list-task';
import { Task } from '../../types';
import { TaskDetailModal } from '../task-detail-modal';

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

  const { data, isLoading, isError } = useListTask({
    search: debouncedSearch,
    approve: typeList,
  });

  const columns: ColumnsType<Task> = [
    {
      title: 'ชื่องาน',
      key: 'workName',
      width: 200,
      render: (task: Task) => (
        // <Typography.Link
        //   onClick={() => toggle.edit(task)}
        // >
        //   {task?.workName}
        // </Typography.Link>
        <Typography>{task?.workName}</Typography>
      ),
    },
    {
      title: 'ชื่อขั้นตอนการทำงาน',
      dataIndex: 'workflowname',
      key: 'workflowname',
      width: 150,
    },
    {
      title: 'ขั้นตอน',
      dataIndex: 'stage',
      key: 'stage',
      width: 150,
    },
    {
      title: 'ผู้ที่รับผิดชอบ',
      dataIndex: 'approve',
      key: 'approve',
      width: 150,
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: string) => (
        <ShowTagStatus status={status} />
      ),
    },
    {
      title: 'วันสิ้นสุด',
      dataIndex: 'deadlineDt',
      key: 'deadlineDt',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: 'วันที่เปิดใช้งาน',
      dataIndex: 'createDt',
      key: 'createDt',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (task: Task) => (
        <DropdownTable
          items={[
            {
              key: 'detail',
              label: 'Detail',
              icon: <EyeOutlined />,
              onClick: () => toggle.edit(task),
            },
          ]}
        />
      ),
    },
  ];

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });

  return (
    <FallbackError isError={isError}>
      <Card
        extra={
          <>
            <Select
              style={{ width: 150 }}
              value={typeList}
              onChange={(e) => setTypeList(e)}
              options={[
                {
                  label: 'งานทั้งหมด',
                  value: 'alltask',
                },
                {
                  label: 'งานของฉัน',
                  value: 'mytask',
                },
              ]}
            />
            <InputSearch
              search={search}
              onSearch={onSearch}
              className="mx-2"
            />
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              className="mr-2"
            >
              ส่งออก
            </Button>
            {ColumnTransfer}
          </>
        }
      >
        <Table
          rowKey="workID"
          tableLayout="fixed"
          scroll={{
            x: 1000,
          }}
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
        <TaskDetailModal
          open={toggle.openEdit}
          onCancel={() => toggle.edit()}
          workId={(toggle.data?.workID as string) ?? ''}
        />
      </Card>
    </FallbackError>
  );
};
