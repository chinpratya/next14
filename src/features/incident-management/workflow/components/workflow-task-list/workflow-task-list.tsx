import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Card, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useRouter } from 'next/router';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import { usePagination } from '@/hooks';

import { useGetWorkflowTaskList } from '../../api/get-workflow-task-list';
import { WorkflowTask } from '../../types';

type WorkflowTaskListProps = {
  id?: string;
};

export const WorkflowTaskList =
  ({}: WorkflowTaskListProps) => {
    const onCreate = () => {
      router.push(`task/create`);
    };
    const {
      page,
      pageSize,
      onPaginationChange,
      Pagination,
    } = usePagination();
    const router = useRouter();
    const { data, isError, isLoading } =
      useGetWorkflowTaskList({
        workflowId: '1',
        page,
        pageSize,
      });

    const columns: ColumnsType<WorkflowTask> = [
      {
        title: 'ชื่องาน',
        key: 'name',
        width: 250,
        ellipsis: true,
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (task) => {
          return (
            <Typography.Link>{task.name}</Typography.Link>
          );
        },
      },
      {
        title: 'ANSWER TYPE',
        key: 'answerType',
        width: 150,
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'จำเป็น (NECESSARY)',
        key: 'necessary',
        width: 150,
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'ลำดับการดำเนินงาน',
        key: 'order',
        width: 150,
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'ระยะเวลาการทำงาน',
        key: 'duration',
        width: 150,
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'การแจ้งเตือน',
        key: 'notification',
        width: 150,
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'เงื่อนไขการแจ้งเตือน',
        key: 'condition',
        width: 150,
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        key: 'action',
        align: 'right',
        width: 50,
        render: (task) => {
          const uuid = task.object_uuid;
          return (
            <DropdownTable
              items={[
                {
                  key: 'edit',
                  label: 'แก้ไข',
                  icon: <EditOutlined />,
                  onClick: () => {
                    console.log(uuid);
                    router.push(`task/${uuid}`);
                  },
                },
                {
                  label: 'Delete',
                  key: 'ลบ',
                  icon: <DeleteOutlined />,
                  // onClick: () => toggle.remove(Workflow),
                },
              ]}
            />
          );
        },
      },
    ];

    return (
      <Card
        title={'รายการงาน'}
        extra={
          <Button
            ghost
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={onCreate}
          >
            สร้างงาน
          </Button>
        }
      >
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={data?.data ?? []}
          tableLayout="fixed"
          scroll={{ x: 750 }}
          pagination={false}
        />
        <Pagination
          current={page}
          total={10}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>
    );
  };
