import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import {
  Card,
  Table,
  Typography,
  Avatar,
  Tooltip,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
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
import { FallbackError } from '@utilComponents/fallback-error';
import { DeleteModal } from '@components/delete-modal';
import { useGetSlaList } from '../../api/get-sla-list';
import { SlaSchema } from '../../schemas';
import { Sla } from '../../types';
import { useDeleteSla } from '../../api/delete-sla';
export const SlaList = () => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const toggle = useToggle();
  const router = useRouter();
  const { showNotification } = useNotifications();
  const { t } = useTranslation();
  const { data, isError, isLoading } = useGetSlaList({
    page,
    pageSize,
  });
  // console.log(data);
  const schemaKey = SlaSchema.keyof().enum;

  const deleteSla = useDeleteSla({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'incidentManagement.notification.sla.delete'
        ) as string,
      });
      toggle.remove();
    },
    onError: () => toggle.remove(),
  });

  const columns: ColumnsType<Sla> = [
    {
      title: 'ชื่อ SLA',
      dataIndex: schemaKey.name,
      width: '20%',
      // ellipsis: true,
      sorter: true,
      render: (name, data) => {
        return (
          <Typography.Link
            href={`${router.asPath}/${data.objectUuid}`}
          >
            {name}
          </Typography.Link>
        );
      },
    },
    {
      title: 'รายละเอียด',
      dataIndex: schemaKey.detail,
      width: '20%',
      // ellipsis: true,
      sorter: true,
      render: (detail, data) => {
        return <Typography>{detail}</Typography>;
      },
    },
    {
      title: 'วันที่สร้าง',
      dataIndex: schemaKey.createdAt,
      width: 100,
      sorter: true,
      render: (createdAt) => (
        <ShowTagDate date={createdAt} />
      ),
    },
    // {
    //   title: 'สร้างโดย',
    //   dataIndex: schemaKey.createdBy,
    //   width: 100,
    //   render: (_, data) => {
    //     return (
    //       <>
    //         <Tooltip title={data.createdBy}>
    //           {data.iconUrl !== '' || undefined ? (
    //             <>
    //               <Avatar src={data.iconUrl} />
    //             </>
    //           ) : (
    //             <>
    //               <Avatar
    //                 style={{
    //                   backgroundColor: `#${data.ObjectID.slice(
    //                     0,
    //                     6
    //                   )}`,
    //                 }}
    //               >
    //                 {data.createdBy.slice(0, 2)}
    //               </Avatar>
    //             </>
    //           )}
    //         </Tooltip>
    //       </>
    //     );
    //   },
    // },
    {
      title: 'วันที่แก้ไข',
      dataIndex: schemaKey.updatedAt,
      width: 100,
      sorter: true,
      render: (updatedAt) => {
        return <ShowTagDate date={updatedAt} />;
      },
    },
    // {
    //   title: 'แก้ไขโดย',
    //   dataIndex: schemaKey.updatedBy,
    //   width: 100,
    //   render: (_, data) => {
    //     return (
    //       <>
    //         <Tooltip title={data.createdBy}>
    //           {data.iconUrl !== '' || undefined ? (
    //             <>
    //               <Avatar src={data.iconUrl} />
    //             </>
    //           ) : (
    //             <>
    //               <Avatar
    //                 style={{
    //                   backgroundColor: `#${data.ObjectID?.slice(
    //                     0,
    //                     6
    //                   )}`,
    //                 }}
    //               >
    //                 {data.createdBy?.slice(0, 2)}
    //               </Avatar>
    //             </>
    //           )}
    //         </Tooltip>
    //       </>
    //     );
    //   },
    // },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (sla) => (
        <DropdownTable
          items={[
            {
              key: 'edit',
              label: 'แก้ไข',
              icon: <EditOutlined />,
              onClick: () => {
                router.push(
                  `${router.asPath}/${sla.objectUuid}`
                );
              },
            },
            {
              key: 'delete',
              label: 'ลบ',
              icon: <DeleteOutlined />,
              onClick: () => toggle.remove(sla),
              // onClick: () => console.log(sla, 'delete'),
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
          </Flex>
        }
      >
        <Table
          rowKey="objectUuid"
          scroll={{
            x: 1000,
          }}
          columns={filteredColumns}
          dataSource={data?.data || []}
          loading={isLoading}
          pagination={false}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <DeleteModal
          open={toggle.openRemove}
          identifier={toggle.data?.name as string}
          loading={deleteSla.isLoading}
          data={toggle.data}
          onCancel={() => toggle.remove()}
          onDelete={(data) =>
            deleteSla.submit(data?.objectUuid as string)
          }
        />
      </Card>
    </FallbackError>
  );
};
