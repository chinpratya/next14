import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import { usePagination, useSearch } from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';

import dataSource from './modal-add-receipt.json';

type ModalAddReceiptProps = {
  open: boolean;
  onClose: () => void;
};

export const ModalAddReceipt = ({
  open,
  onClose,
}: ModalAddReceiptProps) => {
  const { onSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const [selectedRowKeys, setSelectedRowKeys] = useState<
    React.Key[]
  >([]);

  const onSelectChange = (
    newSelectedRowKeys: React.Key[]
  ) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onSubmit = () => {
    console.log('selectedRowKeys', selectedRowKeys);
  };

  const columns: ColumnsType<Record<string, unknown>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 150,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 150,
    },

    {
      title: 'Organization',
      dataIndex: 'organization',
      key: 'organization',
      width: 150,
    },
    {
      title: 'Organization Type',
      dataIndex: 'organizationType',
      key: 'organizationType',
      width: 150,
    },
  ];

  return (
    <Modal
      title="Add Receipt"
      open={open}
      onOk={onSubmit}
      onCancel={onClose}
    >
      <>
        <Flex justifyContent="end" alignItems="center">
          <InputSearch onSearch={onSearch} />
        </Flex>
        <Table
          rowKey="id"
          tableLayout="fixed"
          scroll={{
            x: 1050,
          }}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowSelection={rowSelection}
        />
        <Pagination
          current={page}
          pageSize={pageSize}
          total={10}
          onChange={onPaginationChange}
        />
      </>
    </Modal>
  );
};
