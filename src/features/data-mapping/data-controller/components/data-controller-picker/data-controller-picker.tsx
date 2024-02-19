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

import { useListDataControllers } from '../../api/list-data-controller';
import { DataControllers } from '../../types';

export type DataControllerPickerProps = ModalProps & {
  position?:
    | 'data-controller'
    | 'data-processor'
    | 'data-protection-officer'
    | 'receipt';
  existingDataControllersId?: string[];
  onFinish?: (dataControllers: DataControllers[]) => void;
};

const ACTOR_TYPE_LABELS = {
  'data-controller': 'ผู้ควบคุมข้อมูลส่วนบุคคล',
  'data-processor': 'ผู้ประมวลผลข้อมูลส่วนบุคคล',
  'data-protection-officer': 'เจ้าหน้าที่คุ้มครองข้อมูล',
  receipt: 'ผู้ที่เกี่ยวข้อง',
};

export const DataControllerPicker = ({
  position = 'data-controller',
  onFinish,
  width = 1000,
  existingDataControllersId = [],
  ...modalProps
}: DataControllerPickerProps) => {
  const { onSearch, search, debouncedSearch } =
    useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { rowSelection, resetSelectedRowKeys } =
    useRowSelection({
      type: 'checkbox',
      disabledRowKeys: existingDataControllersId,
      disabledKey: 'dataProcessorID',
    });

  const columns: ColumnsType<DataControllers> = [
    {
      title: 'ชื่อ',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'อีเมล',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'ประเภท',
      dataIndex: 'personalType',
      key: 'personalType',
      width: 200,
    },
    {
      title: 'องค์กร',
      dataIndex: 'organizationName',
      key: 'organizationName',
      width: 200,
    },
    {
      title: 'ประเภทองค์กร',
      dataIndex: 'organizationType',
      key: 'organizationType',
      width: 200,
    },
  ];

  const { data, isLoading, isError } =
    useListDataControllers({
      position,
      page,
      pageSize,
      search: debouncedSearch,
    });

  const handleOk = () => {
    const selectedRowKeys: string[] =
      rowSelection.selectedRowKeys ?? [];
    const selectedDataControllers = data?.data.filter(
      (item) =>
        selectedRowKeys.includes(item.dataProcessorID)
    );
    onFinish?.(selectedDataControllers ?? []);
  };

  return (
    <Modal
      title={`เพิ่ม${ACTOR_TYPE_LABELS[position]}`}
      width={width}
      {...modalProps}
      onOk={handleOk}
      afterClose={() => {
        resetSelectedRowKeys;
        onSearch('');
      }}
    >
      <FallbackError isError={isError}>
        <Flex justifyContent="end">
          <InputSearch
            onSearch={onSearch}
            search={search}
          />
        </Flex>
        <Table
          rowKey="dataProcessorID"
          tableLayout="fixed"
          scroll={{
            x: 1000,
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
