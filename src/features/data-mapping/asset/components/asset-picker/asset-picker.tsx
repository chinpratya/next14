import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

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

import { useListAsset } from '../../api/list-asset';
import { Asset } from '../../types';

export type AssetPickerProps = ModalProps & {
  existingAssetId?: string[];
  onFinish?: (dataAsset: Asset[]) => void;
  onClose: () => void;
};

export const AssetPicker = ({
  onFinish,
  width = 1000,
  existingAssetId = [],
  onClose,
  ...modalProps
}: AssetPickerProps) => {
  const { debouncedSearch, onSearch } = useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { rowSelection, resetSelectedRowKeys } =
    useRowSelection({
      type: 'checkbox',
      disabledRowKeys: existingAssetId,
      disabledKey: 'assetID',
    });

  const columns: ColumnsType<Asset> = [
    {
      title: (
        <IntlMessage id="dataMapping.assetPicker.name" />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.assetPicker.group" />
      ),
      dataIndex: 'group',
      key: 'group',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.assetPicker.country" />
      ),
      dataIndex: 'country',
      key: 'country',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.assetPicker.owner" />
      ),
      dataIndex: 'owner',
      key: 'owner',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.assetPicker.organization" />
      ),
      dataIndex: 'organization',
      key: 'organization',
      width: 150,
    },
  ];

  const { data, isLoading, isError } = useListAsset({
    page,
    pageSize,
    search: debouncedSearch,
  });

  const handleOk = () => {
    const selectedRowKeys: string[] =
      rowSelection.selectedRowKeys ?? [];
    const selectedDataAsset = data?.data.filter((item) =>
      selectedRowKeys.includes(item.assetID)
    );
    onFinish?.(selectedDataAsset ?? []);
  };

  return (
    <Modal
      title={
        <IntlMessage id="dataMapping.assetPicker.title" />
      }
      width={width}
      {...modalProps}
      onOk={handleOk}
      onCancel={() => onClose()}
      afterClose={resetSelectedRowKeys}
    >
      <FallbackError isError={isError}>
        <Flex justifyContent="end">
          <InputSearch onSearch={onSearch} />
        </Flex>
        <Table
          rowKey="assetID"
          tableLayout="fixed"
          scroll={{
            x: 1050,
          }}
          loading={isLoading}
          columns={columns}
          dataSource={data?.data}
          rowSelection={rowSelection}
          pagination={false}
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
