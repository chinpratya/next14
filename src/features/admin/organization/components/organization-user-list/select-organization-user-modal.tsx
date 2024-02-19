import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';

import {
  useRowSelection,
  usePagination,
  useSearch,
} from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListUser } from '../../../user';
import { useCreateOrganizationUser } from '../../api/create-organization-user';
import { OrganizationUser } from '../../types';

export type SelectOrganizationUserModalProps = {
  organizationId: string;
  open: boolean;
  onClose: () => void;
};

export const SelectOrganizationUserModal = ({
  organizationId,
  open,
  onClose,
}: SelectOrganizationUserModalProps) => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { debouncedSearch, onSearch } = useSearch();
  const { data, isLoading, isError } = useListUser({
    page,
    pageSize,
    search: debouncedSearch,
    ignore_departmentId: organizationId,
  });
  const { showNotification } = useNotifications();

  const { rowSelection, setSelectedRowKeys } =
    useRowSelection();
  const createOrganizationUser =
    useCreateOrganizationUser({
      organizationId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: 'User added successfully',
        });
        onClose();
      },
    });

  const columns: ColumnsType<OrganizationUser> = [
    {
      title: <IntlMessage id="admin.selectUser.name" />,
      key: 'name',
      width: 200,
      render: (user: OrganizationUser) =>
        `${user.first_name} ${user.last_name}`,
    },
    {
      title: <IntlMessage id="admin.selectUser.email" />,
      key: 'email',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="admin.selectUser.organization" />
      ),
      key: 'organization',
      dataIndex: 'organization_labels',
      align: 'center',
      width: 200,
      render: (organization_labels: string[]) =>
        organization_labels.join(', '),
    },
    {
      title: (
        <IntlMessage id="admin.selectUser.employeeClassification" />
      ),
      key: 'employeeClassification',
      dataIndex: 'employee_classification',
      align: 'center',
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
      title={<IntlMessage id="admin.selectUser.title" />}
      open={open}
      onCancel={onClose}
      width={950}
      okButtonProps={{
        loading: createOrganizationUser.isLoading,
        disabled:
          rowSelection.selectedRowKeys.length === 0,
      }}
      onOk={() =>
        createOrganizationUser.submit({
          userId: rowSelection.selectedRowKeys,
        })
      }
    >
      <FallbackError isError={isError}>
        <Flex justifyContent="end">
          <InputSearch onSearch={onSearch} />
        </Flex>
        <Table
          rowKey="userId"
          tableLayout="fixed"
          scroll={{
            x: 800,
          }}
          loading={isLoading}
          columns={columns}
          dataSource={data?.data}
          rowSelection={rowSelection}
          pagination={false}
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
