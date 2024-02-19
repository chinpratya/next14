import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import { useEffect } from 'react';

import {
  usePagination,
  useRowSelection,
  useSearch,
} from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListOrganizationManagement } from '../../api/list-organization-management';
import { OrganizationManagement } from '../../types';

export type OrganizationPickerModalProps = {
  open: boolean;
  onClose: () => void;
  onFinish: (
    organization: OrganizationManagement
  ) => void;
  selectedOrganizationId?: string;
};

export const OrganizationPickerModal = ({
  open,
  onClose,
  onFinish,
  selectedOrganizationId,
}: OrganizationPickerModalProps) => {
  const { rowSelection } = useRowSelection({
    type: 'radio',
  });
  const { debouncedSearch, search, onSearch } =
    useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination({
    pageSize: 5,
  });
  const { data, isLoading, isError } =
    useListOrganizationManagement({
      page,
      pageSize,
      search: debouncedSearch,
      expand: 'expand',
    });

  const columns: ColumnsType<OrganizationManagement> = [
    {
      title: (
        <IntlMessage id="admin.organizationPickerModal.name" />
      ),
      dataIndex: 'department_name',
      key: 'department_name',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="admin.organizationPickerModal.label" />
      ),
      dataIndex: 'department_abbreviation',
      key: 'department_label',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="admin.organizationPickerModal.level" />
      ),
      dataIndex: 'level',
      key: 'level',
      width: 200,
    },
  ];

  const handleFinish = () => {
    const selectedRow = _.get(
      rowSelection,
      'selectedRowKeys[0]'
    );
    const organization = _.find(
      dataSource,
      (item) => item.departmentId === selectedRow
    );
    if (organization) {
      onFinish?.(organization);
    }
  };

  const dataSource = [
    ..._.get(data, 'data', []),
    ..._.get(data, 'data[0].sub_department', []),
  ];

  useEffect(() => {
    if (
      !open &&
      !_.isEmpty(rowSelection.selectedRowKeys) &&
      !debouncedSearch
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
    if (open && selectedOrganizationId) {
      rowSelection.onChange([selectedOrganizationId]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, selectedOrganizationId]);

  return (
    <Modal
      title={
        <IntlMessage id="admin.organizationPickerModal.title" />
      }
      open={open}
      onCancel={onClose}
      onOk={handleFinish}
    >
      <FallbackError isError={isError}>
        <Flex justifyContent="end">
          <InputSearch
            search={search}
            onSearch={onSearch}
          />
        </Flex>
        <Table
          rowKey="departmentId"
          tableLayout="fixed"
          scroll={{
            x: 600,
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
