import { SearchOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Row, Input, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSearch, usePagination } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { Role, useListRole } from '../../../role';
import { useAddRoleUser } from '../../api/add-role-user';

type UserDetailRoleAddProps = {
  open: boolean;
  onToggle: () => void;
};

export const UserDetailRoleAdd = ({
  open,
  onToggle,
}: UserDetailRoleAddProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const userId = router.query.userId as string;
  const { showNotification } = useNotifications();
  const { debouncedSearch, onSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const [selectRole, setSelectRole] = useState<
    React.Key[]
  >(['']);

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'admin.notification.user.role.add'
      ) as string,
    });
    setSelectRole([]);
  };

  const addRoleUser = useAddRoleUser({
    onSuccess: onSuccess,
    userId,
    toggleModal: onToggle,
  });

  const listRole = useListRole({
    search: debouncedSearch,
    page,
    pageSize,
    ignore_userId: userId,
  });

  const columns: ColumnsType<Role> = [
    {
      title: (
        <IntlMessage id="admin.userManagement.user.detail.role.add.table.name" />
      ),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: (
        <IntlMessage id="admin.userManagement.user.detail.role.add.table.description" />
      ),
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const onSubmit = () => {
    addRoleUser.submit({
      userId,
      roleId: selectRole as string[],
    });
  };
  return (
    <>
      <Modal
        title={
          <IntlMessage id="admin.userManagement.user.detail.role.add.title" />
        }
        open={open}
        onCancel={() => onToggle()}
        onOk={onSubmit}
        okButtonProps={{ loading: addRoleUser.isLoading }}
      >
        <FallbackError isError={listRole.isError}>
          <Row justify="end">
            <Input
              className={css`
                width: 35% !important;
              `}
              onChange={onSearch}
              placeholder={
                t(
                  'admin.userManagement.user.detail.role.add.searchPlaceholder'
                ) as string
              }
              prefix={<SearchOutlined />}
            />
          </Row>
          <Table
            className={css`
              margin-top: 10px !important;
            `}
            rowKey="roleId"
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: selectRole,
              onChange: (selectedRowKeys) => {
                setSelectRole(selectedRowKeys);
              },
            }}
            loading={listRole.isLoading}
            columns={columns}
            dataSource={listRole?.data?.data ?? []}
            pagination={false}
          />
          <Pagination
            current={page}
            total={listRole.data?.totalRecord}
            pageSize={pageSize}
            onChange={onPaginationChange}
          />
        </FallbackError>
      </Modal>
    </>
  );
};
