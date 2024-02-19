import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Card, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import {
  useColumnFiltered,
  usePagination,
  useSearch,
  usePermission,
} from '@/hooks';
import { permissions } from '@/permissions';
import { DropdownTable } from '@components/dropdown-table';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListDataControllers } from '../../api/list-data-controller';
import { DataControllers } from '../../types';

export type DataControllerListProps = {
  onEdit?: (dataController: DataControllers) => void;
  onDelete?: (dataController: DataControllers) => void;
};

export const DataControllerList = ({
  onEdit,
  onDelete,
}: DataControllerListProps) => {
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
      permissions['pdpakit:datamap:dataprocessor:delete'],
    ],
  });

  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:dataprocessor:update'],
    ],
  });

  const readPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:dataprocessor:read'],
    ],
  });

  const { data, isLoading, isError } =
    useListDataControllers({
      page,
      pageSize,
      search: debouncedSearch,
    });

  const columns: ColumnsType<DataControllers> = [
    {
      title: (
        <IntlMessage id="dataMapping.dataController.Id" />
      ),
      dataIndex: 'dataProcessorID',
      key: 'dataProcessorID',
      width: 100,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataController.name" />
      ),
      key: 'name',
      width: 200,
      render: (dataController: DataControllers) => (
        <Typography.Link
          onClick={() => onEdit?.(dataController)}
          disabled={!readPermission.isAllow}
        >
          {dataController?.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataController.type" />
      ),
      dataIndex: 'personalType',
      key: 'personalType',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataController.organization" />
      ),
      dataIndex: 'organizationName',
      key: 'organizationName',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataController.organizationType" />
      ),
      dataIndex: 'organizationType',
      key: 'organizationType',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataController.country" />
      ),
      dataIndex: 'country',
      key: 'country',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataController.position" />
      ),
      dataIndex: 'position',
      key: 'position',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataController.createdDt" />
      ),
      dataIndex: 'created_dt',
      key: 'created_dt',
      width: 200,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataController.updatedDt" />
      ),
      dataIndex: 'updated_dt',
      key: 'last_updated_dt',
      width: 200,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      key: 'action',
      width: 50,
      render: (dataController: DataControllers) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="dataMapping.dataController.edit" />
              ),
              key: 'edit',
              icon: <EditOutlined />,
              disabled: !editPermission.isAllow,
              onClick: () => onEdit?.(dataController),
            },
            {
              label: (
                <IntlMessage id="dataMapping.dataController.delete" />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              disabled: !deletePermission.isAllow,
              onClick: () => onDelete?.(dataController),
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
          loading={isLoading}
          tableLayout="fixed"
          scroll={{
            x: 1550,
          }}
          rowKey="dataProcessorID"
          dataSource={data?.data}
          columns={filteredColumns}
          pagination={false}
        />
        <Pagination
          total={data?.totalRecord}
          onChange={onPaginationChange}
          pageSize={pageSize}
          current={page}
        />
      </Card>
    </FallbackError>
  );
};
