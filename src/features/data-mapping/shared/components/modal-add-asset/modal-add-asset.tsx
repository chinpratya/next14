import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import { usePagination, useSearch } from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';

import dataSource from './modal-add-asset.json';

type ModalAddAssetProps = {
  open: boolean;
  onClose: () => void;
};

export const ModalAddAsset = ({
  open,
  onClose,
}: ModalAddAssetProps) => {
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
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
      width: 150,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      width: 150,
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      width: 150,
    },
    {
      title: 'Organization',
      dataIndex: 'organization',
      key: 'organization',
      width: 150,
    },
  ];

  return (
    <Modal
      title="Add Asset"
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
