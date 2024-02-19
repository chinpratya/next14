import { SearchOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Row, Input, Table } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSearch, usePagination } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListGroup } from '../../../user-group';
import { useAddGroupUser } from '../../api/add-group-user';

type UserDetailGroupAddProps = {
  open: boolean;
  onToggle: () => void;
};

export const UserDetailGroupAdd = ({
  open,
  onToggle,
}: UserDetailGroupAddProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const userId = router.query.userId as string;
  const { showNotification } = useNotifications();
  const { onSearch, debouncedSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const [selectGroup, setSelectGroup] = useState<
    React.Key[]
  >(['']);

  const onSuccess = () => {
    showNotification({
      type: 'success',
      message: t(
        'admin.notification.user.group.add'
      ) as string,
    });
    setSelectGroup([]);
  };

  const addGroupUser = useAddGroupUser({
    onSuccess: onSuccess,
    userId,
    toggleModal: onToggle,
  });

  const listGroup = useListGroup({
    search: debouncedSearch,
    page,
    pageSize,
    ignore_userId: userId,
  });

  const columns = [
    {
      title: (
        <IntlMessage id="admin.userManagement.user.detail.group.add.table.name" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: (
        <IntlMessage id="admin.userManagement.user.detail.group.add.table.description" />
      ),
      dataIndex: 'description',
      key: 'description',
      width: 200,
    },
  ];

  const onSubmit = () => {
    addGroupUser.submit({
      userId,
      groupId: selectGroup as string[],
    });
  };

  return (
    <>
      <Modal
        title={
          <IntlMessage id="admin.userManagement.user.detail.group.add.title" />
        }
        open={open}
        onCancel={() => onToggle()}
        onOk={onSubmit}
        okButtonProps={{
          loading: addGroupUser.isLoading,
        }}
      >
        <FallbackError isError={listGroup.isError}>
          <Row justify={'end'}>
            <Input
              className={css`
                width: 35% !important;
              `}
              placeholder={
                t(
                  'admin.userManagement.user.detail.group.add.searchPlaceholder'
                ) as string
              }
              prefix={<SearchOutlined />}
              onChange={onSearch}
            />
          </Row>
          <Table
            className={css`
              margin-top: 10px !important;
            `}
            rowKey={'groupId'}
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: selectGroup,
              onChange: (selectedRowKeys) => {
                setSelectGroup(selectedRowKeys);
              },
            }}
            columns={columns}
            dataSource={listGroup?.data?.data ?? []}
            pagination={false}
            loading={listGroup.isLoading}
            tableLayout="fixed"
            scroll={{ x: 300 }}
          />
          <Pagination
            current={page}
            total={listGroup.data?.totalRecord}
            pageSize={pageSize}
            onChange={onPaginationChange}
          />
        </FallbackError>
      </Modal>
    </>
  );
};
