import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Card, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

import {
  usePagination,
  useColumnFiltered,
  useSearch,
  useToggle,
  usePermission,
} from '@/hooks';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteTags } from '../../../../data-mapping/tags';
import { useListTags } from '../../../../data-mapping/tags';
import { DataMappingTags } from '../../../../data-mapping/tags';
import { TagsDetailModal } from '../tags-detail-modal';

export const TagsList = () => {
  const { t } = useTranslation();
  const toggle = useToggle();
  const { debouncedSearch, search, onSearch } =
    useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { showNotification } = useNotifications();

  const { data, isError, isLoading } = useListTags({
    search: debouncedSearch,
    page,
    pageSize,
  });

  const deletePermission = usePermission({
    moduleName: 'consent',
    policies: [permissions['pdpakit:consent:tag:delete']],
  });

  const editPermission = usePermission({
    moduleName: 'consent',
    policies: [permissions['pdpakit:consent:tag:update']],
  });

  const readPermission = usePermission({
    moduleName: 'consent',
    policies: [permissions['pdpakit:consent:tag:read']],
  });

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'consentManagement.notification.tags.delete'
      ) as string,
    });
    toggle.remove();
  };

  const deleteTag = useDeleteTags({
    onSuccess,
  });

  const columns: ColumnsType<DataMappingTags> = [
    {
      title: (
        <IntlMessage id="consentManagement.tags.id" />
      ),
      key: 'tagID',
      width: 100,
      ellipsis: true,
      render: (tags: DataMappingTags) => (
        <Typography.Link
          onClick={() => toggle.edit(tags)}
          disabled={!readPermission.isAllow}
        >
          {tags?.tagID}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="consentManagement.tags.name" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="consentManagement.tags.organization" />
      ),
      dataIndex: 'organization',
      key: 'organization',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="consentManagement.tags.createdDt" />
      ),
      dataIndex: 'createdDt',
      key: 'createdDt',
      width: 150,
      render: (date) => <ShowTagDate date={date} />,
    },
    {
      title: (
        <IntlMessage id="consentManagement.tags.updatedDt" />
      ),
      dataIndex: 'updatedDt',
      key: 'updatedDt',
      width: 150,
      render: (date) => <ShowTagDate date={date} />,
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (tags: DataMappingTags) => (
        <DropdownTable
          items={[
            {
              label: (
                <IntlMessage id="consentManagement.tags.edit" />
              ),
              key: 'edit',
              icon: <EditOutlined />,
              disabled: !editPermission.isAllow,
              onClick: () => toggle.edit(tags),
            },
            {
              label: (
                <IntlMessage id="consentManagement.tags.delete" />
              ),
              key: 'delete',
              icon: <DeleteOutlined />,
              disabled: !deletePermission.isAllow,
              onClick: () => toggle.remove(tags),
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
          <Flex justifyContent="end">
            <InputSearch
              search={search}
              onSearch={onSearch}
              className="mr-2"
            />
            {ColumnTransfer}
          </Flex>
        }
      >
        <Table
          rowKey="tagID"
          scroll={{ x: 900 }}
          tableLayout="fixed"
          columns={filteredColumns}
          loading={isLoading}
          dataSource={data?.data ?? []}
          pagination={false}
        />
        <Pagination
          current={page}
          pageSize={pageSize}
          total={data?.totalRecord}
          onChange={onPaginationChange}
        />
      </Card>
      <DeleteModal
        open={toggle.openRemove}
        identifier={toggle?.data?.name}
        okButtonProps={{
          loading: deleteTag.isLoading,
        }}
        data={toggle.data}
        onCancel={() => toggle.remove()}
        onDelete={(data) =>
          deleteTag.submit(data?.tagID as string)
        }
      />
      <TagsDetailModal
        open={toggle.openEdit}
        onClose={() => toggle.edit()}
        tagId={toggle?.data?.tagID}
      />
    </FallbackError>
  );
};
