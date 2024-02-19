import { Card, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import {
  Activity,
  useListActivity,
  useListGroup,
} from '@/features/data-mapping';
import {
  useSearch,
  usePagination,
  useColumnFiltered,
} from '@/hooks';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

export type ActivityListProps = {
  onEdit?: (activity: Activity) => void;
};

export const ActivityList = ({
  onEdit,
}: ActivityListProps) => {
  const { debouncedSearch, search, onSearch } =
    useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isLoading, isError } = useListActivity({
    consent: true,
    page,
    pageSize,
    search: debouncedSearch,
  });

  const listGroup = useListGroup({
    menuID: 'Activity',
  });

  const columns: ColumnsType<Activity> = [
    {
      title: (
        <IntlMessage id="consentManagement.activity.activityList.id" />
      ),
      dataIndex: 'ObjectUUID',
      key: 'ObjectUUID',
      ellipsis: true,
      width: 200,
    },
    {
      title: (
        <IntlMessage id="consentManagement.activity.activityList.name" />
      ),
      key: 'name',
      width: 200,
      render: (activity: Activity) => (
        <Typography.Link
          onClick={() => onEdit?.(activity)}
        >
          {activity?.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="consentManagement.activity.activityList.group" />
      ),
      dataIndex: 'group',
      key: 'group',
      filters:
        listGroup?.data?.data?.map((group) => ({
          value: group.name,
          text: group.name,
        })) ?? [],
      onFilter: (value, record) => record.group === value,
      width: 150,
    },
    {
      title: (
        <IntlMessage id="consentManagement.activity.activityList.status" />
      ),
      dataIndex: 'status',
      key: 'status',
      width: 150,
      filters: [
        {
          text: 'ใช้งาน',
          value: 'active',
        },
        {
          text: 'ไม่ใช้งาน',
          value: 'inactive',
        },
      ],
      onFilter: (value, record) =>
        record.status === value,
      render: (status: string) => (
        <ShowTagStatus status={status} />
      ),
    },
    {
      title: (
        <IntlMessage id="consentManagement.activity.activityList.createDate" />
      ),
      dataIndex: 'created_dt',
      key: 'created_dt',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="consentManagement.activity.activityList.lastUpdate" />
      ),
      dataIndex: 'updated_dt',
      key: 'updated_dt',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
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
        title={
          <IntlMessage id="consentManagement.activity.activityList" />
        }
        extra={
          <>
            <InputSearch
              search={search}
              onSearch={onSearch}
              className="mr-2"
            />
            {ColumnTransfer}
          </>
        }
      >
        <Table
          rowKey="ObjectUUID"
          tableLayout="fixed"
          scroll={{
            x: 1050,
          }}
          columns={filteredColumns}
          dataSource={data?.data}
          pagination={false}
          loading={isLoading}
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
