import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useRowSelection,
  useSearch,
  usePagination,
} from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListUser } from '../../../user/api/list-user';
import { useCreateGroupUsers } from '../../api/create-group-users';
import { GroupUser } from '../../types';

export type GroupUsersAddModalProps = {
  open: boolean;
  groupId: string;
  onCancel: () => void;
};

export const GroupUsersAddModal = ({
  open,
  groupId,
  onCancel,
}: GroupUsersAddModalProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const { rowSelection, setSelectedRowKeys } =
    useRowSelection({});
  const { debouncedSearch, onSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isLoading, isError } = useListUser({
    search: debouncedSearch,
    page,
    pageSize,
    ignore_groupId: groupId,
  });

  const createGroupUser = useCreateGroupUsers({
    groupId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.userGroup.user.add'
        ) as string,
      });
      onCancel();
    },
  });

  const onCreateGroupUser = () => {
    createGroupUser.submit(rowSelection?.selectedRowKeys);
  };

  const columns: ColumnsType<GroupUser> = [
    {
      title: (
        <IntlMessage id="admin.businessSetting.userGroup.detail.user.table.name" />
      ),
      key: 'name',
      width: 200,
      render: (user: GroupUser) =>
        `${user.first_name} ${user.last_name}`,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.userGroup.detail.user.table.email" />
      ),
      key: 'email',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.userGroup.detail.user.table.organization" />
      ),
      key: 'organization_labels',
      dataIndex: 'organization_labels',
      align: 'center',
      width: 100,
      render: (organization_labels: string[]) =>
        organization_labels.length,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.userGroup.detail.user.table.employeeClassification" />
      ),
      key: 'employee_classification',
      dataIndex: 'employee_classification',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.userGroup.detail.user.table.status" />
      ),
      dataIndex: 'status',
      key: 'status',
      width: 200,
    },
  ];

  useEffect(() => {
    if (!open) {
      setSelectedRowKeys([]);
    }
  }, [open, setSelectedRowKeys]);

  return (
    <Modal
      title={
        <IntlMessage id="admin.businessSetting.userGroup.detail.user.add.title" />
      }
      open={open}
      onCancel={onCancel}
      width={1000}
      onOk={onCreateGroupUser}
      okButtonProps={{
        loading: createGroupUser.isLoading,
        disabled:
          rowSelection.selectedRowKeys.length === 0,
      }}
    >
      <FallbackError isError={isError}>
        <Flex justifyContent="end" className="mb-4">
          <InputSearch onSearch={onSearch} />
        </Flex>
        <Table
          rowKey="userId"
          columns={columns}
          dataSource={data?.data}
          pagination={false}
          rowSelection={rowSelection}
          loading={isLoading}
        />
        <Pagination
          current={page}
          pageSize={pageSize}
          total={data?.totalRecord}
          onChange={onPaginationChange}
        />
      </FallbackError>
    </Modal>
  );
};
