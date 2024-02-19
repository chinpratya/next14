import { Flex } from '@mantine/core';
import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';

import { InputSearch } from '@/components/share-components/input-search';
import { Modal } from '@/components/share-components/modal';
import { TagTooltipListChild } from '@/components/share-components/tag-tooltip-list-child';
import { usePagination, useSearch } from '@/hooks';
import { IntlMessage } from '@utilComponents/intl-message';

import { User, useListUser } from '../../../../admin';
import { AssetResponsible } from '../../types';

export type AssetAddAdminModalProps = {
  open: boolean;
  loading?: boolean;
  listResponsible?: AssetResponsible[];
  onSubmit?: (responsible: string[]) => void;
  onCancel?: () => void;
};

export const AssetAddResponsibleModal = ({
  open,
  loading,
  listResponsible,
  onSubmit,
  onCancel,
}: AssetAddAdminModalProps) => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { onSearch, debouncedSearch } = useSearch();

  const [selected, setSelected] = useState<string[]>([]);

  const { data, isLoading, isError } = useListUser({
    default: 'expand',
    page,
    pageSize,
    search: debouncedSearch,
  });

  const columns: ColumnsType<User> = [
    {
      title: (
        <IntlMessage id="dataMapping.asset.detail.responsible.name" />
      ),
      key: 'name',
      render: ({ first_name, last_name }: User) => (
        <Typography.Text>{`${first_name} ${last_name}`}</Typography.Text>
      ),
      width: 250,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.asset.detail.responsible.email" />
      ),
      key: 'email',
      dataIndex: 'email',
      width: 200,
      ellipsis: true,
    },
    {
      title: (
        <IntlMessage id="dataMapping.asset.detail.responsible.tel" />
      ),
      key: 'phone_number',
      dataIndex: 'phone_number',
      width: 170,
    },
    {
      title: (
        <IntlMessage id="dataMapping.asset.detail.responsible.organization" />
      ),
      key: 'organization',
      dataIndex: 'organization_labels',
      render: (organization) => (
        <TagTooltipListChild list={organization} />
      ),
      width: 180,
    },
  ];

  useEffect(() => {
    if (listResponsible && open)
      setSelected(
        listResponsible.map((item) => item.responsibleID)
      );
  }, [listResponsible, open]);

  const afterClose = () => {
    setSelected([]);
    onPaginationChange(1);
    onSearch('');
  };

  return (
    <Modal
      title={
        <IntlMessage id="dataMapping.asset.detail.responsible.select" />
      }
      open={open}
      onCancel={onCancel}
      width={900}
      afterClose={afterClose}
      onOk={() => onSubmit?.(selected)}
      isError={isError}
      okButtonProps={{ loading }}
      destroyOnClose
    >
      <Flex justify="flex-end">
        <InputSearch
          className="mb-2"
          onSearch={onSearch}
        />
      </Flex>
      <Table
        dataSource={data?.data}
        columns={columns}
        pagination={false}
        rowKey="userId"
        loading={isLoading}
        rowSelection={{
          type: 'checkbox',
          getCheckboxProps: (record: User) => ({
            disabled: listResponsible?.find(
              (item) =>
                item.responsibleID === record.userId
            )
              ? true
              : false,
          }),
          onChange: (selectedRowKeys) => {
            setSelected(selectedRowKeys as string[]);
          },
        }}
        tableLayout="fixed"
        scroll={{ x: 850 }}
      />
      <Pagination
        current={page}
        total={data?.totalRecord}
        pageSize={pageSize}
        onChange={onPaginationChange}
      />
    </Modal>
  );
};
