import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Card, Table, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import {
  useColumnFiltered,
  usePagination,
  useSearch,
  useToggle,
} from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { DropdownTable } from '@components/dropdown-table';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';
import { useDeleteTag } from '../../api/delete-tag';
import { useListTags } from '../../api/list-tags';
import { Tag } from '../../types';
import { TagsDetailModal } from '../tags-detail-modal';

export const TagsList = () => {
  const { t } = useTranslation();
  const toggle = useToggle<Tag>();

  const { search, debouncedSearch, onSearch } =
    useSearch();

  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isLoading, isError } = useListTags({
    search: debouncedSearch,
    page,
    pageSize,
  });

  const { showNotification } = useNotifications();

  const deleteTag = useDeleteTag({
    onSuccess: () => {
      toggle.remove();
      showNotification({
        type: 'success',
        message: t(
          'dsarAutomation.notification.tags.delete'
        ) as string,
      });
    },
  });

  const actionRender = (data: Tag) => (
    <DropdownTable
      items={[
        {
          label: (
            <IntlMessage id="dsarAutomation.tags.edit" />
          ),
          key: 'edit',
          icon: <EditOutlined />,
          onClick: () => toggle.edit(data),
        },
        {
          label: (
            <IntlMessage id="dsarAutomation.tags.delete" />
          ),
          key: 'delete',
          icon: <DeleteOutlined />,
          onClick: () => toggle.remove(data),
        },
      ]}
    />
  );

  const columns = [
    {
      title: (
        <IntlMessage id="dsarAutomation.tags.tagId" />
      ),
      key: 'objectUuid',
      width: 200,
      ellipsis: true,
      render: (data: Tag) => (
        <Typography.Link
          onClick={() => toggle.edit(data)}
        >
          {data.objectUuid}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.tags.name" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 200,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.tags.organization" />
      ),
      dataIndex: 'organization',
      key: 'organization',
      width: 200,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.tags.createdDt" />
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="dsarAutomation.tags.updatedDt" />
      ),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      key: 'action',
      width: 50,
      render: actionRender,
    },
  ];

  const { filteredColumnsKeys, ColumnTransfer, xScroll } =
    useColumnFiltered({
      columns,
    });

  const filteredColumns = columns.filter((column) =>
    filteredColumnsKeys.includes(column.key)
  );

  return (
    <FallbackError isError={isError}>
      <Card
        extra={
          <>
            <InputSearch
              value={search}
              onChange={onSearch}
              className="mr-2"
            />
            {ColumnTransfer}
          </>
        }
      >
        <Table
          loading={isLoading}
          columns={filteredColumns}
          dataSource={data?.data}
          pagination={false}
          rowKey="objectUuid"
          tableLayout="fixed"
          scroll={{ x: xScroll }}
        />
        <Pagination
          current={page}
          pageSize={pageSize}
          total={data?.totalPage}
          onChange={onPaginationChange}
        />
      </Card>
      <TagsDetailModal
        open={toggle.openEdit}
        onClose={() => toggle.edit()}
        tagId={toggle.data?.objectUuid}
      />
      <DeleteModal
        open={toggle.openRemove}
        onCancel={() => toggle.remove()}
        okButtonProps={{
          loading: deleteTag.isLoading,
        }}
        identifier={toggle.data?.name}
        onDelete={() =>
          deleteTag.submit(toggle.data.objectUuid)
        }
      />
    </FallbackError>
  );
};
