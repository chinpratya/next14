import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Card, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import {
  useColumnFiltered,
  usePagination,
  useSearch,
  useToggle,
} from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { DeleteModal } from '@components/delete-modal';
import { InputSearch } from '@components/input-search';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useDeleteGroup } from '../../api/delete-group';
import { useListGroup } from '../../api/list-group';
import { Group } from '../../types';

export const GroupList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const toggle = useToggle<Group>();
  const { showNotification } = useNotifications();

  const { debouncedSearch, onSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { data, isLoading, isError } = useListGroup({
    search: debouncedSearch,
    page,
    pageSize,
  });

  const onEdit = (group: Group) => {
    router.push(`${router.asPath}/${group.groupId}`);
  };

  const deleteGroup = useDeleteGroup({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.userGroup.delete'
        ) as string,
      });
      toggle.remove();
    },
  });

  const columns: ColumnsType<Group> = [
    {
      title: (
        <IntlMessage id="admin.businessSetting.userGroup.table.name" />
      ),
      key: 'name',
      width: 350,
      render: (group) => (
        <Typography.Link onClick={() => onEdit(group)}>
          {group.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.userGroup.table.user" />
      ),
      dataIndex: 'total_user',
      key: 'total_user',
      align: 'center',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.userGroup.table.description" />
      ),
      dataIndex: 'description',
      key: 'description',
      width: 500,
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (group: Group) => (
        <DropdownTable
          items={[
            {
              key: 'edit',
              label: 'Edit',
              icon: <EditOutlined />,
              onClick: () => onEdit(group),
            },
            {
              key: 'divider',
              type: 'divider',
            },
            {
              key: 'delete',
              label: 'Delete',
              icon: <DeleteOutlined />,
              onClick: () => toggle.remove(group),
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
          rowKey="groupId"
          tableLayout="fixed"
          scroll={{
            x: 1050,
          }}
          loading={isLoading}
          columns={filteredColumns}
          dataSource={data?.data}
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
        okButtonProps={{
          loading: deleteGroup.isLoading,
        }}
        title="Delete Record"
        content={`Are you sure want to delete this user group: ${toggle.data?.name} ?`}
        identifier={toggle?.data?.name as string}
        onDelete={() =>
          deleteGroup.submit(toggle?.data.groupId)
        }
        onCancel={() => toggle.remove()}
      />
    </FallbackError>
  );
};
