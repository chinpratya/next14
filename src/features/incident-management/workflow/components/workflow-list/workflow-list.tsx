import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Card,
  Table,
  Button,
  Typography,
  Avatar,
  Tooltip,
  // Tag,
  // Typography,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useRouter } from 'next/router';

import {
  useColumnFiltered,
  usePagination,
  useToggle,
} from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { DropdownTable } from '@components/dropdown-table';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetWorkflowList } from '../../api/get-workflow-list';
import { WorkflowIncidentDatas } from '../../types';

export const WorkflowList = () => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const toggle = useToggle();
  const router = useRouter();
  const { showNotification } = useNotifications();

  const { data, isError, isLoading } = useGetWorkflowList(
    {
      page,
      pageSize,
    }
  );
  const columns: ColumnsType<WorkflowIncidentDatas> = [
    {
      title: 'ชื่อแผนการตอบสนอง',
      key: 'name',
      width: '15%',
      dataIndex: 'name',
      sorter: true,
      render: (name, data: WorkflowIncidentDatas) => {
        return (
          <Typography.Link
            href={`${router.asPath}/${data.object_uuid}`}
          >
            {name}
          </Typography.Link>
        );
      },
    },
    {
      title: () => {
        return (
          <Flex justifyContent="center">
            <span>
              ระยะเวลาในการดำเนินการของแผนการตอบสนอง
            </span>
          </Flex>
        );
      },
      dataIndex: 'isActive',
      key: 'isActive',
      width: 400,
      filters: [],
      render: (status) => {
        return (
          <>
            <Flex justifyContent="center">
              <ShowTagStatus status={status} />
            </Flex>
          </>
        );
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 100,
      filters: [
        { text: 'เปิดการใช้งาน', value: true },
        { text: 'ปิดการใช้งาน', value: false },
      ],
      render: (isActive) => {
        return <ShowTagStatus status={`${isActive}`} />;
      },
    },
    {
      title: 'วันที่สร้าง',
      dataIndex: 'createdDt',
      key: 'createdDt',
      width: 100,
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render: (createdDt) => (
        <ShowTagDate date={createdDt} />
      ),
    },
    {
      title: 'สร้างโดย',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 100,
      filters: [
        {
          text: 'test@example.com',
          value: 'test@example.com',
        },
        {
          text: 'test2@example.com',
          value: 'test2@example.com',
        },
      ],
      render: (_ss, data: WorkflowIncidentDatas) => {
        return (
          <>
            <Tooltip title={data.createdBy}>
              {data.iconUrl !== '' || undefined ? (
                <>
                  <Avatar src={data.iconUrl} />
                </>
              ) : (
                <>
                  <Avatar
                    style={{
                      backgroundColor: `#${data.object_uuid?.slice(
                        0,
                        6
                      )}`,
                    }}
                  >
                    {data.createdBy?.slice(0, 2)}
                  </Avatar>
                </>
              )}
            </Tooltip>
          </>
        );
      },
    },
    {
      title: 'วันที่แก้ไข',
      dataIndex: 'updatedDt',
      key: 'updatedDt',
      width: 100,
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render: (updatedDt) => {
        return <ShowTagDate date={updatedDt} />;
      },
    },
    {
      title: 'แก้ไขโดย',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
      width: 100,
      filters: [
        {
          text: 'test@example.com',
          value: 'test@example.com',
        },
        {
          text: 'test2@example.com',
          value: 'test2@example.com',
        },
      ],
      render: (_ss, datas: WorkflowIncidentDatas) => {
        return (
          <>
            <Tooltip title={datas?.createdBy}>
              {datas?.iconUrl !== '' || undefined ? (
                <>
                  <Avatar src={datas?.iconUrl} />
                </>
              ) : (
                <>
                  <Avatar
                    style={{
                      backgroundColor: `#${datas?.object_uuid?.slice(
                        0,
                        6
                      )}`,
                    }}
                  >
                    {datas?.createdBy?.slice(0, 2)}
                  </Avatar>
                </>
              )}
            </Tooltip>
          </>
        );
      },
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (object_uuid) => (
        <DropdownTable
          items={[
            {
              key: 'edit',
              label: 'แก้ไข',
              icon: <EditOutlined />,
              onClick: () => {
                router.push(
                  `${router.asPath}/${object_uuid.object_uuid}`
                );
              },
            },
            {
              key: 'delete',
              label: 'ลบ',
              icon: <DeleteOutlined />,
              // onClick: () => toggle.remove(Workflow),
              onClick: () =>
                console.log(
                  object_uuid.object_uuid,
                  'delete'
                ),
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
          <Flex
            justifyContent={'between'}
            alignItems="center"
          >
            <InputSearch
              className="mr-1"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
            <Button
              type="primary"
              icon={<UploadOutlined />}
              className="mr-1"
            >
              ส่งออก
            </Button>
            {ColumnTransfer}
          </Flex>
        }
      >
        <Table
          rowKey="workflowID"
          scroll={{
            x: 1400,
          }}
          columns={filteredColumns}
          dataSource={data?.data ?? []}
          loading={false || isLoading}
          pagination={false}
        />
        <Pagination
          current={page}
          total={10}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        {/* <DeleteModal
          open={toggle.openRemove}
          onCancel={() => toggle.remove()}
          identifier={toggle.data?.name}
          onDelete={() =>
            deleteWorkflow.submit(toggle.data?.workflowID)
          }
          okButtonProps={{
            loading: deleteWorkflow.isLoading,
          }}
        /> */}
      </Card>
    </FallbackError>
  );
};
