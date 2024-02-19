import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { useListUser, User } from '@/features/admin';
import {
  usePagination,
  useSearch,
  useRowSelection,
} from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { Modal, ModalProps } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

type ModalAddRelatedOrganizationsProps = ModalProps & {
  open: boolean;
  onClose: () => void;
  existingDataUserId?: string[];
  onFinish?: (dataUser: User[]) => void;
};

export const ModalAddRelatedOrganizations = ({
  open,
  onClose,
  existingDataUserId,
  onFinish,
  ...modalProps
}: ModalAddRelatedOrganizationsProps) => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { onSearch, debouncedSearch } = useSearch();
  const { data, isError, isLoading } = useListUser({
    search: debouncedSearch,
    page,
    pageSize,
  });

  const { rowSelection, resetSelectedRowKeys } =
    useRowSelection({
      type: 'checkbox',
      disabledRowKeys: existingDataUserId,
      disabledKey: 'userId',
    });

  const columns: ColumnsType<Record<string, unknown>> = [
    {
      title: (
        <IntlMessage id="dataMapping.relatedOrganization.userId" />
      ),
      key: 'userId',
      width: 200,
      dataIndex: 'userId',
    },
    {
      title: (
        <IntlMessage id="dataMapping.relatedOrganization.first_name" />
      ),
      key: 'first_name ',
      dataIndex: 'first_name',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.relatedOrganization.last_name" />
      ),
      key: 'last_name',
      dataIndex: 'last_name',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.relatedOrganization.email" />
      ),
      key: 'email',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.relatedOrganization.tel" />
      ),
      key: 'phone_number',
      dataIndex: 'phone_number',
      width: 200,
    },
  ];
  const handleOk = () => {
    const selectedRowKeys: string[] =
      rowSelection.selectedRowKeys ?? [];
    const selectedDataUser = data?.data.filter((item) =>
      selectedRowKeys.includes(item.userId)
    );
    onFinish?.(selectedDataUser ?? []);
  };
  return (
    <Modal
      title={
        <IntlMessage id="dataMapping.relatedOrganization.title" />
      }
      {...modalProps}
      open={open}
      onCancel={onClose}
      onOk={handleOk}
      afterClose={resetSelectedRowKeys}
    >
      <FallbackError isError={isError}>
        <Flex justifyContent="end">
          <InputSearch
            onSearch={onSearch}
            className="mb-3"
          />
        </Flex>
        <Table
          loading={isLoading}
          columns={columns}
          scroll={{ x: 1000 }}
          tableLayout="fixed"
          dataSource={data?.data ?? []}
          pagination={false}
          rowKey={'userId'}
          rowSelection={rowSelection}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </FallbackError>
    </Modal>
  );
};
