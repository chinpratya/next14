import { css } from '@emotion/css';
import { Table, Tag, Cascader, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import {
  ERROR_COLOR,
  PROCESSING_COLOR,
  CANCELED_COLOR,
} from '@/config/color';
import {
  usePagination,
  useRowSelection,
  useSearch,
} from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { Modal, ModalProps } from '@components/modal';
import { ShowTagStatus } from '@components/show-tag-status';
import { TagItems } from '@components/tag-items';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListTags } from '../../../tags/api/list-tags';
import { useListDataCategories } from '../../api/list-data-categories';
import {
  DataCategory,
  DataCategoryClassification,
} from '../../types';
import { DataCategoryListDataElement } from '../data-category-list-data-element';

export type DataCategoriesPickerProps = ModalProps & {
  onFinish?: (data: DataCategory[]) => void;
  exitingDataCategories?: string[];
};

const expandedRowRender: (
  record: DataCategory
) => JSX.Element = (dataCategory) => {
  return (
    <DataCategoryListDataElement
      dataCategoryId={dataCategory.categoryID}
    />
  );
};

export const DataCategoriesPicker = ({
  onFinish,
  exitingDataCategories,
  ...modalProps
}: DataCategoriesPickerProps) => {
  const { debouncedSearch, onSearch } = useSearch();
  const {
    page,
    pageSize,
    Pagination,
    onPaginationChange,
  } = usePagination();
  const { rowSelection, resetSelectedRowKeys } =
    useRowSelection({
      disabledKey: 'categoryID',
      disabledRowKeys: exitingDataCategories,
    });
  const [tagID, setTagID] = useState<string>();
  const listTag = useListTags({});

  const optionsTag = listTag.data?.data.map((value) => {
    return {
      label: value.name,
      value: value.tagID,
    };
  });
  const { data, isLoading, isError } =
    useListDataCategories({
      search: debouncedSearch,
      page,
      pageSize,
      status: 'active',
      tagID,
    });

  const columns: ColumnsType<DataCategory> = [
    {
      title: (
        <IntlMessage id="dataMapping.dataCategoryPicker.name" />
      ),
      key: 'name',
      width: 150,
      ellipsis: true,
      dataIndex: 'name',
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategoryPicker.groupName" />
      ),
      key: 'group',
      width: 130,
      ellipsis: true,
      dataIndex: 'groupName',
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategoryPicker.status" />
      ),
      key: 'status',
      align: 'center',
      dataIndex: 'status',
      width: 100,
      render: (status) => (
        <ShowTagStatus status={status} />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategoryPicker.dataClassifications" />
      ),
      key: 'dataClassifications',
      width: 200,
      dataIndex: 'categoryClassifications',
      render: (dataClassification) => (
        <TagItems
          tags={dataClassification?.map(
            (item: DataCategoryClassification) =>
              item?.categoryClassificationID
          )}
          items={[
            {
              key: 'generalData',
              label: (
                <IntlMessage id="dataMapping.dataCategoryPicker.dataClassifications.generalData" />
              ),
              color: CANCELED_COLOR,
            },
            {
              key: 'personalData',
              label: (
                <IntlMessage id="dataMapping.dataCategoryPicker.dataClassifications.personalData" />
              ),
              color: PROCESSING_COLOR,
            },
            {
              key: 'sensitiveData',
              label: (
                <IntlMessage id="dataMapping.dataCategoryPicker.dataClassifications.sensitiveData" />
              ),
              color: ERROR_COLOR,
            },
          ]}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategoryPicker.organization" />
      ),
      key: 'organization',
      width: 100,
      ellipsis: true,
      dataIndex: 'organization',
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

  const handleFinish = () => {
    const selectedRows = rowSelection?.selectedRowKeys;
    const selectedData = data?.data?.filter((item) =>
      selectedRows.includes(item.categoryID)
    );
    onFinish?.(selectedData as DataCategory[]);
  };

  const onChange = (value: string[][]) => {
    const ate = value.map((item) => item[0]);
    setTagID(ate.join(','));
  };

  return (
    <Modal
      title={
        <IntlMessage id="dataMapping.dataCategoryPicker.title" />
      }
      width={1000}
      {...modalProps}
      onOk={handleFinish}
      afterClose={resetSelectedRowKeys}
    >
      <FallbackError isError={isError}>
        <Flex justifyContent="end">
          <Flex
            justifyContent="between"
            alignItems="center"
            className={css`
              width: 400px;
            `}
          >
            <Typography.Text>
              <IntlMessage id="dataMapping.activity.activityDetail.tags" />{' '}
              :
            </Typography.Text>
            <Cascader
              className={css`
                width: 78%;
                margin: 0 5px;
              `}
              dropdownMenuColumnStyle={{
                width: '300px',
              }}
              options={optionsTag}
              onChange={(e) => onChange(e as string[][])}
              multiple
              maxTagCount={'responsive'}
              showSearch
            />
          </Flex>
          <InputSearch onSearch={onSearch} />
        </Flex>
        <Table
          rowKey="categoryID"
          loading={isLoading}
          columns={columns}
          dataSource={data?.data}
          pagination={false}
          rowSelection={rowSelection}
          expandable={{
            expandedRowRender,
          }}
        />
        <Pagination
          total={data?.totalRecord}
          pageSize={pageSize}
          current={page}
          onChange={onPaginationChange}
        />
      </FallbackError>
    </Modal>
  );
};
