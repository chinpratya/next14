import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import {
  useColumnFiltered,
  usePagination,
  useSearch,
} from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListOrganizationManagement } from '../../api/list-organization-management';
import { OrganizationManagement } from '../../types';

export interface ListOrganizationChartProps {
  onAdd?: (organization: OrganizationManagement) => void;
  onDelete?: (
    organization: OrganizationManagement
  ) => void;
  onEdit?: (organization: OrganizationManagement) => void;
}

export const ListOrganizationChart = ({
  onAdd,
  onDelete,
  onEdit,
}: ListOrganizationChartProps) => {
  const { debouncedSearch, onSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { data, isLoading, isError } =
    useListOrganizationManagement({
      search: debouncedSearch,
      page,
      pageSize,
    });

  const columns: ColumnsType<OrganizationManagement> = [
    {
      title: (
        <IntlMessage id="admin.businessSetting.organizationManagement.name" />
      ),
      dataIndex: 'department_name',
      key: 'name',
      width: 350,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.organizationManagement.initials" />
      ),
      dataIndex: 'department_abbreviation',
      key: 'initials',
      align: 'center',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.organizationManagement.label" />
      ),
      dataIndex: 'level_label',
      key: 'label',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.organizationManagement.lvOrganization" />
      ),
      dataIndex: 'level',
      key: 'level',
      align: 'center',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.organizationManagement.user" />
      ),
      dataIndex: 'total_user',
      key: 'user',
      align: 'center',
      width: 100,
    },
    {
      key: 'action',
      align: 'left',
      width: 50,
      render: (organization) => (
        <Flex>
          <PlusCircleOutlined
            className="mr-2"
            onClick={() => onAdd?.(organization)}
          />
          <EditOutlined
            className="mr-2"
            onClick={() => onEdit?.(organization)}
          />
          <DeleteOutlined
            hidden={!organization.under_department}
            className="mr-2"
            onClick={() => onDelete?.(organization)}
          />
        </Flex>
      ),
    },
  ];

  const defaultExpandedRowKeys = data?.data?.map(
    (item) => item.departmentId
  );

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });

  return (
    <FallbackError isError={isError}>
      <Card
        title={
          <IntlMessage id="admin.businessSetting.organizationManagement.title" />
        }
        extra={
          <>
            <InputSearch
              onSearch={onSearch}
              className="mr-2"
            />
            {ColumnTransfer}
          </>
        }
      >
        <Table
          loading={isLoading}
          rowKey="departmentId"
          tableLayout="fixed"
          scroll={{ x: 950 }}
          columns={filteredColumns}
          expandable={{
            defaultExpandedRowKeys,
            childrenColumnName: 'sub_department',
          }}
          dataSource={data?.data}
          pagination={false}
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
