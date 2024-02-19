import { css } from '@emotion/css';
import { Table, Tag, Typography, Cascader } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import React, { useState } from 'react';

import {
  CANCELED_COLOR,
  ERROR_COLOR,
  PROCESSING_COLOR,
} from '@/config/color';
import {
  usePagination,
  useSearch,
  useFilter,
} from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { ShowTagStatus } from '@components/show-tag-status';
import { TagItems } from '@components/tag-items';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { DataCategoryClassification } from '../../../data-categories';
import { useListTags } from '../../../tags/api/list-tags';
import { useListDataCategoryOfActivity } from '../../api/list-data-catery-of-activity';
import { ActivityDataCategory } from '../../types';

import { ActivityBasisPurposeAddDataCategoryExpand } from './activity-basis-purpose-add-data-category-expand';

type CategariesType = {
  dataCategoryID: string;
  elements: string[];
};

type ActivityDasisPurposeAddDataCategoryProps = {
  activityId: string;
  setPayloadCategory: (data: CategariesType[]) => void;
};

export const ActivityDasisPurposeAddDataCategory = ({
  activityId,
  setPayloadCategory,
}: ActivityDasisPurposeAddDataCategoryProps) => {
  const [selectedRowKeys, setSelectedRowKeys] =
    useState<React.Key[]>();
  const [
    selectedDataElementKey,
    setSelectedDataElementKey,
  ] = useState<CategariesType[]>();
  const [expandKeys, setExpandKeys] = useState<string[]>(
    []
  );
  const [tagID, setTagID] = useState<string>();
  const { filters, columnFilter, filterDropdown } =
    useFilter<ActivityDataCategory>();

  const { debouncedSearch, onSearch } = useSearch();
  const {
    page,
    pageSize,
    Pagination,
    onPaginationChange,
  } = usePagination();

  const { data, isLoading, isError } =
    useListDataCategoryOfActivity({
      search: debouncedSearch,
      page,
      pageSize,
      activityId,
      tagID,
      ...filters,
    });
  const listTag = useListTags({});

  const optionsTag = listTag.data?.data.map((value) => {
    return {
      label: value.name,
      value: value.tagID,
    };
  });
  const columns: ColumnsType<ActivityDataCategory> = [
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
      width: 300,
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
        <IntlMessage id="dataMapping.dataCategoryPicker.tag" />
      ),
      key: 'tagName',
      width: 150,
      ellipsis: true,
      dataIndex: 'tagName',
      ...columnFilter('filter'),
      filters: listTag.data?.data?.map((value) => ({
        text: value.name,
        value: value.tagID,
      })),
      filterDropdown: filterDropdown('tagID'),
      render: (tagName: string[]) =>
        tagName?.map((tag: string) => (
          <Tag className="mx-1 my-1" key={tag}>
            {tag}
          </Tag>
        )),
    },
  ];

  const selectDataElement = (data: CategariesType) => {
    const duplicatesIndex = _.findIndex(
      selectedDataElementKey,
      {
        dataCategoryID: data.dataCategoryID,
      }
    );
    if (duplicatesIndex !== -1) {
      const element = [...(selectedDataElementKey ?? [])];
      _.set(element, duplicatesIndex, data);
      setSelectedDataElementKey(element);
      setPayloadCategory(element);
    } else {
      setSelectedDataElementKey([
        ...(selectedDataElementKey ?? []),
        data,
      ]);
      setPayloadCategory([
        ...(selectedDataElementKey ?? []),
        data,
      ]);
    }
  };
  const expandedRowRender: (
    record: ActivityDataCategory
  ) => JSX.Element = (dataCategory) => {
    const onCheckAllData = (isCheck: boolean) => {
      if (isCheck) {
        const key = _.uniq([
          ...(selectedRowKeys ?? []),
          dataCategory.categoryID,
        ]);
        setSelectedRowKeys(key);
      } else {
        const keyFileted = selectedRowKeys?.filter(
          (v) => v !== dataCategory.categoryID
        );
        setSelectedRowKeys(keyFileted);
      }
    };
    return (
      <ActivityBasisPurposeAddDataCategoryExpand
        dataCategoryId={dataCategory.categoryID}
        selectDataElement={selectDataElement}
        onCheckAllDataCategory={onCheckAllData}
      />
    );
  };

  const onChangeTag = (value: string[][]) => {
    const ate = value.map((item) => item[0]);
    setTagID(ate.join(','));
  };

  return (
    <FallbackError isError={isError}>
      <Flex justifyContent="end">
        <Flex
          justifyContent="between"
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
            onChange={(e) => onChangeTag(e as string[][])}
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
        rowSelection={{
          selectedRowKeys,
          onChange: (newSelectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
            setExpandKeys(newSelectedRowKeys as string[]);
          },
          onSelect: (selectedRowKeys) => {
            selectDataElement({
              dataCategoryID: selectedRowKeys.categoryID,
              elements: [],
            });
          },
          getCheckboxProps: (record) => ({
            name: record.name,
          }),
        }}
        expandable={{
          expandedRowRender,
          expandedRowKeys: expandKeys,
          onExpandedRowsChange: (e) =>
            setExpandKeys(e as string[]),
        }}
        scroll={{ x: 830 }}
        tableLayout="fixed"
      />
      <Pagination
        total={data?.totalRecord}
        pageSize={pageSize}
        current={page}
        onChange={onPaginationChange}
      />
    </FallbackError>
  );
};
