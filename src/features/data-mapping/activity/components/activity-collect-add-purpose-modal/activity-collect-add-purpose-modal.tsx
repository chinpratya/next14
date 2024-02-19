import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import {
  usePagination,
  useSearch,
  useRowSelection,
} from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListActivityPurpose } from '../../api/list-activity-purpose';
import { ActivityPurposeList } from '../../types';

type ActivityCollectAddPurposeModalProps = {
  open: boolean;
  onClose: () => void;
  onFinish?: (
    dataPurposePicker: ActivityPurposeList[]
  ) => void;
  loading: boolean;
  existingDataPurposeId?: string[];
  activityId: string;
};

export const ActivityCollectAddPurposeModal = ({
  open,
  onClose,
  onFinish,
  loading,
  existingDataPurposeId,
  activityId,
}: ActivityCollectAddPurposeModalProps) => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { onSearch, debouncedSearch } = useSearch();
  const { data, isLoading, isError } =
    useListActivityPurpose({
      activityId,
      search: debouncedSearch,
      page,
      pageSize,
    });
  const { rowSelection, resetSelectedRowKeys } =
    useRowSelection({
      type: 'checkbox',
      disabledRowKeys: existingDataPurposeId,
      disabledKey: 'purposeID',
    });

  const statusItems = [
    {
      label: 'Active',
      key: 'active',
      color: '#04D182',
    },
    {
      label: 'Inactive',
      key: 'inactive',
      color: '#FF4B4B',
    },
  ];
  const columns: ColumnsType<ActivityPurposeList> = [
    {
      title: (
        <IntlMessage id="dataMapping.purposePicker.name" />
      ),
      key: 'name',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.purposePicker.group" />
      ),
      key: 'group ',
      dataIndex: 'group',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.purposePicker.legalBasis" />
      ),
      key: 'legalBasis ',
      dataIndex: 'legalBasis',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.purposePicker.status" />
      ),
      key: 'status',
      dataIndex: 'status',
      width: 150,
      render: (status: string) => (
        <ShowTagStatus
          status={status}
          items={statusItems}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.purposePicker.version" />
      ),
      key: 'version',
      dataIndex: 'version',
      width: 100,
      render: (version: string) => `V.${version}`,
    },
    {
      title: (
        <IntlMessage id="dataMapping.purposePicker.organization" />
      ),
      key: 'organization',
      dataIndex: 'organization',
      width: 150,
    },
  ];
  const handleOk = () => {
    const selectedRowKeys: string[] =
      rowSelection.selectedRowKeys ?? [];
    const selectedDataPurpose = data?.data.filter(
      (item) => selectedRowKeys.includes(item.purposeID)
    );
    onFinish?.(selectedDataPurpose ?? []);
  };
  return (
    <Modal
      title={
        <IntlMessage id="dataMapping.purposePicker.title" />
      }
      open={open}
      onCancel={onClose}
      width={1000}
      onOk={handleOk}
      okButtonProps={{ loading: loading }}
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
          rowKey={'purposeID'}
          rowSelection={rowSelection}
        />
        <Pagination
          current={page}
          total={10}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
      </FallbackError>
    </Modal>
  );
};
