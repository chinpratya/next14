import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Card, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';

import { DeleteModal } from '@/components/share-components/delete-modal';
import { DropdownTable } from '@/components/share-components/dropdown-table';
import { InputSearch } from '@/components/share-components/input-search';
import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { FallbackError } from '@/components/util-components/fallback-error';
import {
  useColumnFiltered,
  usePagination,
  usePermission,
  useSearch,
  useToggle,
} from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteDataMappingOrganizations } from '../../api/delete-data-mapping-organizations';
import { useListDataMappingOrganizations } from '../../api/list-data-mapping-organizations';
import { DataMappingOrganizations } from '../../types';
import { OrganizationDetailModal } from '../organization-detail-modal';

export const OrganizationLists = () => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const toggle = useToggle();
  const { onSearch, debouncedSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isError, isLoading } =
    useListDataMappingOrganizations({
      page,
      pageSize,
      search: debouncedSearch,
    });

  const deletePermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:organization:delete'],
    ],
  });

  const editPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:organization:update'],
    ],
  });

  const readPermission = usePermission({
    moduleName: 'datamap',
    policies: [
      permissions['pdpakit:datamap:organization:read'],
    ],
  });

  const deleteOrganization =
    useDeleteDataMappingOrganizations({
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'dataMapping.notification.organization.delete'
          ) as string,
        });
        toggle.remove();
      },
    });

  const columns: ColumnsType<DataMappingOrganizations> = [
    {
      title: (
        <IntlMessage id="dataMapping.organization.organizationID" />
      ),
      key: 'entityId',
      width: 100,
      ellipsis: true,
      render: (
        Organizations: DataMappingOrganizations
      ) => {
        return (
          <Typography.Link
            onClick={() => toggle.edit(Organizations)}
            disabled={!readPermission.isAllow}
          >
            {Organizations?.entityId}
          </Typography.Link>
        );
      },
    },
    {
      title: (
        <IntlMessage id="dataMapping.organization.abbreviation" />
      ),
      key: 'shortName',
      width: 100,
      dataIndex: 'shortName',
    },
    {
      title: (
        <IntlMessage id="dataMapping.organization.name" />
      ),
      key: 'name',
      width: 100,
      dataIndex: 'name',
    },
    {
      title: (
        <IntlMessage id="dataMapping.organization.createdDt" />
      ),
      key: 'createdDt',
      width: 100,
      dataIndex: 'createdDt',
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.organization.updatedDt" />
      ),
      key: 'updatedDt',
      width: 100,
      dataIndex: 'updatedDt',
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      key: 'action',
      width: 50,
      render: (
        organization: DataMappingOrganizations
      ) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="dataMapping.organization.edit" />
              ),
              key: 'edit',
              icon: <EditOutlined />,
              onClick: () => toggle.edit(organization),
              disabled: !editPermission.isAllow,
            },
            {
              label: (
                <IntlMessage id="dataMapping.organization.delete" />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              disabled: !deletePermission.isAllow,
              onClick: () => toggle.remove(organization),
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
          columns={filteredColumns}
          rowKey="organizationID"
          dataSource={data?.data ?? []}
          scroll={{ x: 1100 }}
          pagination={false}
          loading={isLoading}
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
          loading={deleteOrganization.isLoading}
          data={toggle.data}
          onCancel={() => toggle.remove()}
          onDelete={(data) =>
            deleteOrganization.submit(
              data?.entityId as string
            )
          }
        />
        <OrganizationDetailModal
          onClose={() => toggle.edit()}
          open={toggle.openEdit}
          organizationId={toggle.data?.entityId}
        />
      </Card>
    </FallbackError>
  );
};
