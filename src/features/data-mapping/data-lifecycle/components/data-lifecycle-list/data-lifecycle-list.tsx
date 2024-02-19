import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Card, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import {
  useColumnFiltered,
  usePagination,
  useSearch,
  usePermission,
} from '@/hooks';
import { permissions } from '@/permissions';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListDataLifecycle } from '../../api/list-data-lifecycle';
import { DataLifecycle } from '../../types';

export type DataLifecycleListProps = {
  onEdit?: (dataLifecycle: DataLifecycle) => void;
  onDelete?: (dataLifecycle: DataLifecycle) => void;
};

export const DataLifecycleList = ({
  onEdit,
  onDelete,
}: DataLifecycleListProps) => {
  const { debouncedSearch, onSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const deletePermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:lifecycle:delete'],
    ],
  });

  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:lifecycle:update'],
    ],
  });

  const readPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:lifecycle:read'],
    ],
  });

  const { data, isLoading, isError } =
    useListDataLifecycle({
      page,
      pageSize,
      search: debouncedSearch,
    });

  const columns: ColumnsType<DataLifecycle> = [
    {
      title: (
        <IntlMessage id="dataMapping.dataLifecycle.dataLifeCycleId" />
      ),
      key: 'dataLifeCycleID',
      dataIndex: 'dataLifeCycleID',
      ellipsis: true,
      width: 100,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataLifecycle.name" />
      ),
      key: 'name',
      width: 300,
      ellipsis: true,
      render: (dataLifecycle: DataLifecycle) => (
        <Typography.Link
          onClick={() => onEdit?.(dataLifecycle)}
          disabled={!readPermission.isAllow}
        >
          {dataLifecycle.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataLifecycle.actorType" />
      ),
      key: 'actorType',
      dataIndex: 'actorType',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataLifecycle.group" />
      ),
      key: 'group',
      dataIndex: 'group',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataLifecycle.status" />
      ),
      key: 'status',
      dataIndex: 'status',
      width: 150,
      align: 'left',
      render: (status: string) => (
        <ShowTagStatus status={status} />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataLifecycle.owner" />
      ),
      key: 'owner',
      dataIndex: 'owner',
      width: 150,
      align: 'left',
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataLifecycle.organization" />
      ),
      key: 'organization',
      dataIndex: 'organization',
      width: 175,
      align: 'left',

      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataLifecycle.createdDt" />
      ),
      dataIndex: 'created_dt',
      key: 'created_dt',
      width: 175,
      align: 'left',
      render: (createdDate: string) => (
        <ShowTagDate date={createdDate} />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataLifecycle.updatedDt" />
      ),
      dataIndex: 'updated_dt',
      key: 'updated_dt',
      align: 'left',
      width: 150,
      render: (createdDate: string) => (
        <ShowTagDate date={createdDate} />
      ),
    },
    {
      key: 'action',
      width: 50,
      render: (dataLifecycle: DataLifecycle) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="dataMapping.group.edit" />
              ),
              key: 'edit',
              icon: <EditOutlined />,
              onClick: () => onEdit?.(dataLifecycle),
              disabled: !editPermission.isAllow,
            },
            {
              label: (
                <IntlMessage id="dataMapping.group.delete" />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              onClick: () => onDelete?.(dataLifecycle),
              disabled: !deletePermission.isAllow,
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
            <InputSearch
              className="mr-2"
              onSearch={onSearch}
            />
            {ColumnTransfer}
          </>
        }
      >
        <Table
          tableLayout="fixed"
          scroll={{
            x: 1550,
          }}
          rowKey="dataLifeCycleID"
          columns={filteredColumns}
          dataSource={data?.data}
          pagination={false}
          loading={isLoading}
        />
        <Pagination
          total={data?.totalRecord}
          current={page}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </Card>
    </FallbackError>
  );
};
