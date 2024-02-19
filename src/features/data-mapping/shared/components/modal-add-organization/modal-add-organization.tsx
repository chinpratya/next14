import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

import { usePagination, useSearch } from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';

type ModalAddOrganizationProps = {
  open: boolean;
  onClose: () => void;
};

export const ModalAddOrganization = ({
  open,
  onClose,
}: ModalAddOrganizationProps) => {
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
      title: 'Label',
      key: 'label',
      dataIndex: 'label',
      width: 200,
    },
    {
      title: 'Lv. Organization',
      key: 'lv_organization',
      dataIndex: 'lv_organization',
      width: 200,
    },
  ];
  const data = [
    {
      name: 'มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย',
      label: 'องค์กรหลัก',
      lv_organization: 'Lv.1',
    },
  ];
  return (
    <Modal
      title="Add Organization"
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
