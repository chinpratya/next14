import { css } from '@emotion/css';
import { Table, Tag, Typography, Cascader } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

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

import { useListTags } from '../../../tags/api/list-tags';
import { useListPurpose } from '../../api/list-purpose';
import { Purpose } from '../../types';

type PurposePickerProps = {
  open: boolean;
  onClose: () => void;
  onFinish?: (dataPurposePicker: Purpose[]) => void;
  loading: boolean;
  existingDataPurposeId?: string[];
};

export const PurposePicker = ({
  open,
  onClose,
  onFinish,
  loading,
  existingDataPurposeId,
}: PurposePickerProps) => {
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const { onSearch, debouncedSearch } = useSearch();
  const [tagID, setTagID] = useState<string>();

  const { data, isLoading, isError } = useListPurpose({
    search: debouncedSearch,
    page,
    pageSize,
    status: 'active',
    tagID,
  });

  const listTag = useListTags({});

  const optionsTag = listTag.data?.data.map((value) => {
    return {
      label: value.name,
      value: value.tagID,
    };
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
  const columns: ColumnsType<Purpose> = [
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
    {
      title: (
        <IntlMessage id="dataMapping.activity.tags" />
      ),
      dataIndex: 'tagName',
      key: 'tagName',
      align: 'left',
      width: 150,
      render: (tagName: string[]) =>
        tagName?.map((tag: string) => (
          <Tag className="mx-1 my-1" key={tag}>
            {tag}
          </Tag>
        )),
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

  const onChange = (value: string[][]) => {
    const ate = value.map((item) => item[0]);
    setTagID(ate.join(','));
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
          <Flex
            justifyContent={'between'}
            alignItems="center"
            className={css`
              width: 400px;
              margin-bottom: 15px;
            `}
          >
            <Typography.Text>
              <IntlMessage id="dataMapping.activity.activityDetail.tags" />{' '}
              :
            </Typography.Text>
            <Cascader
              dropdownMenuColumnStyle={{
                width: '300px',
              }}
              className={css`
                width: 78%;
                margin: 0 5px;
              `}
              options={optionsTag}
              onChange={(e) => onChange(e as string[][])}
              multiple
              maxTagCount={'responsive'}
              showSearch
            />
          </Flex>
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
