// import { PlusCircleOutlined } from '@ant-design/icons';
import {
  Avatar,
  Card,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { SUCCESS_COLOR } from '@/config/color';
import { useColumnFiltered, useToggle } from '@/hooks';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';

import { useListRequestTask } from '../../api/list-request-task';
import { RequestTask } from '../../types';
import { RequestDetailTaskAddModal } from '../request-detail-task-add-modal';

type RequestDetailTaskListProps = {
  requestId: string;
  stateId: string;
};

export const RequestDetailTaskList = ({
  requestId,
  stateId,
}: RequestDetailTaskListProps) => {
  const toggle = useToggle();

  const { data, isLoading, isError } = useListRequestTask(
    requestId,
    stateId
  );
  const columns: ColumnsType<RequestTask> = [
    {
      title: 'ชื่องาน',
      key: 'name',
      width: 150,
      render: (task: RequestTask) => (
        <Typography.Link onClick={() => toggle.create()}>
          {task?.name}
        </Typography.Link>
      ),
    },
    {
      title: 'ขั้นตอนการทำงาน',
      dataIndex: 'workflowname',
      key: 'workflowname',
      width: 150,
    },
    {
      title: 'สถานะ',
      dataIndex: 'AssigneStatus',
      key: 'AssigneStatus',
      width: 100,
      render: (status: string) => (
        <ShowTagStatus
          status={status}
          items={[
            {
              label: 'มอบหมาย',
              key: 'assign',
              color: SUCCESS_COLOR,
            },
          ]}
        />
      ),
    },
    {
      title: 'ผู้ที่รับผิดชอบ',
      dataIndex: 'AssigneName',
      key: 'AssigneName',
      width: 100,
      render: (_ss, data) => {
        return (
          <>
            <Tooltip title={data.AssigneName}>
              <>
                <Avatar
                  style={{
                    backgroundColor: `#${data.AssigneID?.slice(
                      0,
                      6
                    )}`,
                    textTransform: 'capitalize',
                  }}
                >
                  {data.AssigneName?.slice(0, 2)}
                </Avatar>
              </>
            </Tooltip>
          </>
        );
      },
      //
    },
  ];

  const { filteredColumns } = useColumnFiltered({
    columns,
  });

  return (
    <FallbackError isError={isError}>
      <Card
        bordered={false}
        // extra={
        //   <>
        //     <Button
        //       className="mr-2"
        //       type="primary"
        //       icon={<PlusCircleOutlined />}
        //       onClick={() => toggle.create()}
        //     >
        //       เพิ่มงาน
        //     </Button>
        //     {ColumnTransfer}
        //   </>
        // }
      >
        <Table
          rowKey="workID"
          tableLayout="fixed"
          scroll={{
            x: 800,
          }}
          columns={filteredColumns}
          dataSource={data?.data ?? []}
          loading={isLoading}
          pagination={false}
        />
        <RequestDetailTaskAddModal
          open={toggle.openCreate}
          onCancel={() => toggle.create()}
          requestId={requestId as string}
          stateId={stateId as string}
        />
      </Card>
    </FallbackError>
  );
};
