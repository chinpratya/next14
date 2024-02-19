import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import { useEffect } from 'react';

import { useListUser, User } from '@/features/admin';
import {
  usePagination,
  useRowSelection,
  useSearch,
} from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';
import { TagTooltipListChild } from '@components/tag-tooltip-list-child';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

export type OrganizationPickerModalProps = {
  open: boolean;
  onClose: () => void;
  onFinish: (user: User) => void;
  selectedUserId?: string;
  titleModal: string;
};

export const UserPickerModal = ({
  open,
  onClose,
  onFinish,
  selectedUserId,
  titleModal = 'dataMapping.userPicker.title',
}: OrganizationPickerModalProps) => {
  const { rowSelection } = useRowSelection({
    type: 'radio',
  });
  const { debouncedSearch, onSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isLoading, isError } = useListUser({
    page,
    pageSize,
    search: debouncedSearch,
    default: 'expand',
  });

  const columns: ColumnsType<User> = [
    {
      title: (
        <IntlMessage id="dataMapping.userPicker.name" />
      ),
      key: 'name',
      width: 200,
      render: (user: User) =>
        `${user.first_name} ${user.last_name}`,
    },
    {
      title: (
        <IntlMessage id="dataMapping.userPicker.email" />
      ),
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.userPicker.department" />
      ),
      dataIndex: 'agencies_labels',
      key: 'agencies_labels',
      width: 200,
      render: (agencies_labels: string[]) => (
        <TagTooltipListChild
          list={agencies_labels ?? []}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.userPicker.organization" />
      ),
      dataIndex: 'organization_labels',
      key: 'organization_labels',
      ellipsis: true,
      width: 250,
      render: (Organization: string[]) => (
        <TagTooltipListChild list={Organization ?? []} />
      ),
    },
  ];

  const handleFinish = () => {
    const selectedRow = _.get(
      rowSelection,
      'selectedRowKeys[0]'
    );
    const user = _.find(data?.data, {
      userId: selectedRow,
    });
    if (user) {
      onFinish(user);
    }
  };

  useEffect(() => {
    if (
      !open &&
      !_.isEmpty(rowSelection.selectedRowKeys) &&
      debouncedSearch === ''
    ) {
      onSearch('' as string);
      rowSelection.onChange([]);
      onPaginationChange(1);
    }
  }, [
    debouncedSearch,
    onPaginationChange,
    onSearch,
    open,
    rowSelection,
  ]);

  useEffect(() => {
    if (open) {
      rowSelection.onChange([selectedUserId ?? '']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, selectedUserId]);

  const dataSource = data?.data;

  return (
    <Modal
      title={<IntlMessage id={titleModal} />}
      open={open}
      onCancel={onClose}
      onOk={handleFinish}
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
          dataSource={dataSource}
          pagination={false}
          rowSelection={rowSelection}
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
