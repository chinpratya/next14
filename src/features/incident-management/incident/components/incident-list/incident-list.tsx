import {
  EyeFilled,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Card,
  Table,
  Button,
  Typography,
  Avatar,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import { useRouter } from 'next/router';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import {
  useColumnFiltered,
  usePagination,
} from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetIncidentList } from '../../api/get-incident-list';
import { IncidentListProps } from '../../types';

export const IncidentList = () => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const router = useRouter();

  const { data, isError, isLoading } = useGetIncidentList(
    {
      page,
      pageSize,
    }
  );

  const columns: ColumnsType<IncidentListProps> = [
    {
      title: 'ID',
      width: 130,
      dataIndex: 'ObjectID',
    },
    {
      title: 'ชื่อเหตุการณ์',
      key: 'name',
      width: 150,
      render: (items: IncidentListProps) => {
        return (
          <Typography.Link
            href={`${router.asPath}/${items.ObjectID}`}
          >
            {items.name}
          </Typography.Link>
        );
      },
    },
    {
      title: 'ประเภทเหตุการณ์',
      dataIndex: 'category',
      width: 150,
      sorter: true,
    },
    {
      title: 'กลุ่มย่อยของเหตุการณ์',
      dataIndex: 'sub_category',
      width: 150,
      sorter: true,
    },
    {
      title: 'กลุ่มเหตุการณ์',
      dataIndex: 'type',
      width: 150,
      sorter: true,
    },
    {
      title: 'ป้ายกำกับ',
      key: 'tag',
      width: 200,
      filters: [
        { text: 'Fire Alarm', value: 'FIRE_ALARM' },
        { text: 'Smoke', value: 'SMOKE' },
      ],
      render: (items: IncidentListProps) => {
        return items.tag.map((el, index) => (
          <Typography.Text key={index}>
            {el.name}
          </Typography.Text>
        ));
      },
    },
    {
      title: 'ระดับความรุนแรง',
      key: 'sla_status',
      width: 150,
      sorter: true,
      render: (items: IncidentListProps) => {
        return items.sla_status;
      },
    },
    {
      title: 'ข้อมูลเพิ่มเติม',
      key: 'detail',
      width: 200,
      sorter: true,
      render: (items: IncidentListProps) => {
        return items.detail.first_name;
      },
    },
    {
      title: 'ระยะเวลาดำเนินงาน',
      key: 'detail',
      width: 150,
      sorter: true,
      render: (items: IncidentListProps) => {
        return items.estimate_time;
      },
    },
    {
      title: 'สถานะ',
      key: 'status',
      width: 100,
      sorter: true,
      render: (items: IncidentListProps) => {
        return items.status;
      },
    },
    {
      title: 'ความคืบหน้า (%)',
      key: 'progression',
      width: 250,
      sorter: true,
      render: () => {
        return '-';
      },
    },
    {
      title: 'วันที่สร้าง',
      key: 'createdDt',
      width: 150,
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render: (items: IncidentListProps) => (
        <ShowTagDate date={items.createdDt} />
      ),
    },
    {
      title: 'สิ้นสุดภายใน',
      key: 'endDt',
      width: 150,
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render: (items: IncidentListProps) => {
        return <ShowTagDate date={items.endDt} />;
      },
    },
    {
      title: 'ผู้รับผิดชอบ',
      key: 'responsibleUser',
      width: 200,
      sorter: true,
      render: () => {
        return (
          <Tooltip title="benzbenz900@gmail.com">
            <Avatar
              style={{
                backgroundColor: 'aquamarine',
              }}
            >
              {'benzbenz900@gmail.com'.slice(0, 2)}
            </Avatar>
          </Tooltip>
        );
      },
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (items: IncidentListProps) => (
        <DropdownTable
          items={[
            {
              key: 'view',
              label: 'View',
              icon: <EyeFilled />,
              onClick: () => {
                router.push(
                  `${router.asPath}/${items.ObjectID}`
                );
              },
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

  const sumWidth = _.sum(columns.map((ss) => ss?.width));

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
            x: sumWidth,
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
      </Card>
    </FallbackError>
  );
};
