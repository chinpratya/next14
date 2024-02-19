import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

import { usePagination, useSearch } from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';

type ModalAddDataProcessorProps = {
  open: boolean;
  onClose: () => void;
};

export const ModalAddDataProcessor = ({
  open,
  onClose,
}: ModalAddDataProcessorProps) => {
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
      title: 'Name',
      key: 'name',
      width: 200,
      dataIndex: 'name',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      width: 200,
    },
    {
      title: 'Organization',
      key: 'organization',
      dataIndex: 'organization',
      width: 200,
    },
    {
      title: 'Organization Type',
      key: 'organizationType',
      dataIndex: 'organizationType',
      width: 200,
    },
  ];
  const data = [
    {
      name: 'Punyisa Supannapakin',
      email: 'Punyisa@gmail.com',
      type: 'บุคคล',
      organization: 'SP',
      organizationType: 'ภานใน',
    },
  ];
  return (
    <Modal
      title="Add Data Processor"
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
