import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { FallbackError } from '@/components/util-components/fallback-error';
import {
  useRowSelection,
  useSearch,
  usePagination,
} from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListRole } from '../../../role';
import { useCreateGroupRole } from '../../api/create-group-role';
import { GroupRole } from '../../types';

export type GroupRolesAddModalProps = {
  groupId: string;
  open: boolean;
  onCancel: () => void;
};

export const GroupRolesAddModal = ({
  groupId,
  open,
  onCancel,
}: GroupRolesAddModalProps) => {
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

  const { data, isLoading, isError } = useListRole({
    search: debouncedSearch,
    page,
    pageSize,
    ignore_groupId: groupId,
  });

  const createGroupRole = useCreateGroupRole({
    groupId,
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'admin.notification.userGroup.role.add'
        ) as string,
      });
      onCancel();
    },
  });

  const onCreateGroupRole = () => {
    createGroupRole.submit(rowSelection?.selectedRowKeys);
  };

  const columns: ColumnsType<GroupRole> = [
    {
      title: (
        <IntlMessage id="admin.businessSetting.userGroup.detail.role.add.table.name" />
      ),
      dataIndex: 'name',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.userGroup.detail.role.add.table.status" />
      ),
      dataIndex: 'status',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="admin.businessSetting.userGroup.detail.role.add.table.description" />
      ),
      dataIndex: 'description',
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
        <IntlMessage id="admin.businessSetting.userGroup.detail.role.add.title" />
      }
      open={open}
      onCancel={onCancel}
      width={1000}
      onOk={onCreateGroupRole}
      okButtonProps={{
        loading: createGroupRole.isLoading,
        disabled:
          rowSelection.selectedRowKeys.length === 0,
      }}
    >
      <FallbackError isError={isError}>
        <Flex justifyContent="end" className="mb-4">
          <InputSearch onSearch={onSearch} />
        </Flex>
        <Table
          rowKey="roleId"
          columns={columns}
          dataSource={data?.data}
          pagination={false}
          rowSelection={rowSelection}
          loading={isLoading}
        />
        <Pagination
          total={data?.totalRecord}
          current={page}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </FallbackError>
    </Modal>
  );
};
