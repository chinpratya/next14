import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';

import {
  CANCELED_COLOR,
  ERROR_COLOR,
  PROCESSING_COLOR,
} from '@/config/color';
import { usePagination, useSearch } from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { Modal, ModalProps } from '@components/modal';
import { ShowTagStatus } from '@components/show-tag-status';
import { TagItems } from '@components/tag-items';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  DataCategoryClassification,
  DataElementOfCategories,
} from '../../../data-categories';
import { useListDataCategoryOfActivity } from '../../api/list-data-catery-of-activity';
import {
  ActivityDataCategory,
  exitingDataElementType,
} from '../../types';

import { ActivityBasisPurposeExpandedDataCategory } from './activity-basis-purpose-expanded-data-category';

type onFinishType = {
  data: Record<string, DataElementOfCategories[]>;
};

export type DataCategoriesPickerProps = ModalProps & {
  onFinish?: ({ data }: onFinishType) => void;
  exitingDataCategories?: string[];
  exitingDataElement: exitingDataElementType[];
  isLoadingAdd: boolean;
  activityId: string;
  onCancel: () => void;
};

export const ActivityBasisPurposeAddDataCategoryModal = ({
  onFinish,
  exitingDataCategories,
  exitingDataElement,
  isLoadingAdd,
  activityId,
  onCancel,
  ...modalProps
}: DataCategoriesPickerProps) => {
  const [dataElements, setDataElements] = useState<
    Record<string, DataElementOfCategories[]>
  >({});
  const [selectedRowKeys, setSelectedRowKeys] =
    useState<React.Key[]>();

  const [expandKeys, setExpandKeys] = useState<string[]>(
    []
  );

  const { debouncedSearch, onSearch } = useSearch();
  const {
    page,
    pageSize,
    Pagination,
    onPaginationChange,
  } = usePagination();

  const selectDataElement = (
    key: DataElementOfCategories[],
    id: string,
    isSelectedParent: boolean
  ) => {
    const findKey = _.findKey(
      dataElements,
      (value, key) => key === id
    );

    if (!isSelectedParent && findKey) {
      const fiterKey = _.omit(dataElements, id);
      setDataElements(fiterKey);
    } else {
      setDataElements({
        ...dataElements,
        [id]: key,
      });
    }
  };

  useEffect(() => {
    if (exitingDataCategories && !selectedRowKeys) {
      setSelectedRowKeys(
        exitingDataCategories as React.Key[]
      );
      setExpandKeys(exitingDataCategories);
    }
  }, [exitingDataElement, selectedRowKeys]);

  const expandedRowRender: (
    record: ActivityDataCategory
  ) => JSX.Element = (dataCategory) => {
    const isExitingDataCategories =
      exitingDataCategories?.includes(
        dataCategory.categoryID
      );
    const isSelectedParent = isExitingDataCategories
      ? exitingDataCategories?.includes(
          dataCategory.categoryID
        )
      : selectedRowKeys?.includes(
          dataCategory.categoryID
        );

    const dataEle =
      exitingDataElement.find(
        (v) =>
          v.dataCategoryID === dataCategory.categoryID
      )?.dataElements ?? [];

    const onCheckAllData = (isCheck: boolean) => {
      if (isCheck) {
        setSelectedRowKeys([
          ...(selectedRowKeys ?? []),
          dataCategory.categoryID,
        ]);
      } else {
        const keyFileted = selectedRowKeys?.filter(
          (v) => v !== dataCategory.categoryID
        );
        setSelectedRowKeys(keyFileted);
      }
    };

    return (
      <ActivityBasisPurposeExpandedDataCategory
        dataCategoryId={dataCategory.categoryID}
        selectDataElement={selectDataElement}
        exitingDataElement={dataEle}
        isSelecteParent={isSelectedParent ?? false}
        onCheckAllDataCategory={onCheckAllData}
      />
    );
  };

  const { data, isLoading, isError } =
    useListDataCategoryOfActivity({
      search: debouncedSearch,
      page,
      pageSize,
      activityId,
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
  ];

  const handleFinish = () => {
    onFinish?.({
      data: dataElements,
    });
  };

  return (
    <Modal
      title={
        <IntlMessage id="dataMapping.dataCategoryPicker.edit" />
      }
      width={1000}
      {...modalProps}
      onOk={handleFinish}
      onCancel={() => {
        onCancel();
      }}
    >
      <FallbackError isError={isError}>
        <Flex justifyContent="end">
          <InputSearch onSearch={onSearch} />
        </Flex>
        <Table
          rowKey="categoryID"
          loading={isLoading || isLoadingAdd}
          columns={columns}
          dataSource={data?.data}
          pagination={false}
          rowSelection={{
            selectedRowKeys,
            onChange: (
              newSelectedRowKeys: React.Key[]
            ) => {
              setSelectedRowKeys(newSelectedRowKeys);
              setExpandKeys(
                newSelectedRowKeys as string[]
              );
            },
            getCheckboxProps: (record) => ({
              disabled: exitingDataCategories?.includes(
                record['categoryID'] as string
              ),
              name: record.name,
            }),
          }}
          expandable={{
            expandedRowRender,
            expandedRowKeys: expandKeys,
            onExpandedRowsChange: (e) =>
              setExpandKeys(e as string[]),
          }}
          scroll={{ x: 780 }}
          tableLayout="fixed"
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
