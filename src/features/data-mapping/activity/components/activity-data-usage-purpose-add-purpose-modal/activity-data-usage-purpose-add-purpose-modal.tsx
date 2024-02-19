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
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListActivityUseAndPublishPurpose } from '../../api/list-activity-use-and-publish-purpose';
import { ActivityUsagePurpose } from '../../types';

type ActivityDataUsagePurposeListAddPurposeModalProps = {
  activityId: string;
  open: boolean;
  onClose: () => void;
  onFinish?: (
    dataPurposePicker: ActivityUsagePurpose[]
  ) => void;
  loading: boolean;
  existingDataPurposeId?: string[];
};

export const ActivityDataUsagePurposeListAddPurposeModal =
  ({
    activityId,
    open,
    onClose,
    onFinish,
    loading,
    existingDataPurposeId,
  }: ActivityDataUsagePurposeListAddPurposeModalProps) => {
    const { onSearch, debouncedSearch } = useSearch();
    const {
      page,
      pageSize,
      onPaginationChange,
      Pagination,
    } = usePagination();

    const { data, isLoading, isError } =
      useListActivityUseAndPublishPurpose({
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

    const columns: ColumnsType<ActivityUsagePurpose> = [
      {
        title: (
          <IntlMessage id="dataMapping.activity.useAndPublic.purpose.purposeId" />
        ),
        dataIndex: 'purposeID',
        key: 'purposeID',
        align: 'left',
        width: 200,
      },
      {
        title: (
          <IntlMessage id="dataMapping.activity.useAndPublic.purpose.name" />
        ),
        key: 'purposeName',
        width: 200,
        render: (purpose: ActivityUsagePurpose) => (
          <span>{purpose.name}</span>
        ),
      },
      {
        title: (
          <IntlMessage id="dataMapping.activity.useAndPublic.purpose.legalBasis" />
        ),
        key: 'legalBasis',
        dataIndex: 'legalBasis',
        width: 150,
      },
      {
        title: (
          <IntlMessage id="dataMapping.activity.useAndPublic.purpose.group" />
        ),
        key: 'group',
        dataIndex: 'group',
        width: 100,
      },
      {
        title: (
          <IntlMessage id="dataMapping.activity.useAndPublic.purpose.organization" />
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
      onFinish?.(
        (selectedDataPurpose as ActivityUsagePurpose[]) ??
          []
      );
    };

    return (
      <Modal
        title={
          <IntlMessage id="dataMapping.purposePicker.title" />
        }
        open={open}
        onCancel={onClose}
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
            dataSource={
              (data?.data as ActivityUsagePurpose[]) ?? []
            }
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
