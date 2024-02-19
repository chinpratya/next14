import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

import { usePagination, useSearch } from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';

type ModalAddPurposeProps = {
  open: boolean;
  onClose: () => void;
};

export const ModalAddPurpose = ({
  open,
  onClose,
}: ModalAddPurposeProps) => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { onSearch } = useSearch();

  const [selectGroup, setSelectGroup] = useState<
    React.Key[]
  >(['']);
  const columns: ColumnsType<Record<string, unknown>> = [
    {
      title: 'ID',
      key: 'ID',
      width: 200,
      dataIndex: 'ID',
    },
    {
      title: 'First Name ',
      key: 'first_name ',
      dataIndex: 'first_name',
      width: 200,
    },
    {
      title: 'Last Name',
      key: 'last_name',
      dataIndex: 'last_name',
      width: 200,
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: 'Tel',
      key: 'tel',
      dataIndex: 'tel',
      width: 200,
    },
  ];
  const data = [
    {
      ID: '213123',
      first_name: 'สมชายสาย',
      last_name: 'สายอีสาน',
      email: 'aum@gmail.com',
      tel: '0862162569',
    },
  ];
  return (
    <Modal
      title="Add Purpose"
      open={open}
      onCancel={onClose}
    >
      <Flex justifyContent="end">
        <InputSearch
          onSearch={onSearch}
          className="mb-3"
        />
      </Flex>
      <Table
        columns={columns}
        scroll={{ x: 1000 }}
        tableLayout="fixed"
        dataSource={data}
        pagination={false}
        rowKey={'name'}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectGroup,
          onChange: (selectedRowKeys) => {
            setSelectGroup(selectedRowKeys);
          },
        }}
      />
      <Pagination
        current={page}
        total={10}
        pageSize={pageSize}
        onChange={onPaginationChange}
      />
    </Modal>
  );
};
