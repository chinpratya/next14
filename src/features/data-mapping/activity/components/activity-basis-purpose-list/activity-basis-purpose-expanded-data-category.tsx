import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState, useEffect } from 'react';

import {
  CANCELED_COLOR,
  ERROR_COLOR,
  PROCESSING_COLOR,
} from '@/config/color';
import { TagItems } from '@components/tag-items';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  DataElementOfCategories,
  useListDataElementOfDataCategories,
} from '../../../data-categories';

export type DataCategoryListDataElementProps = {
  dataCategoryId: string;
  selectDataElement: (
    key: DataElementOfCategories[],
    id: string,
    isSelecteParent: boolean
  ) => void;
  exitingDataElement: string[];
  isSelecteParent: boolean;
  onCheckAllDataCategory: (id: boolean) => void;
};

export const ActivityBasisPurposeExpandedDataCategory = ({
  dataCategoryId,
  selectDataElement,
  exitingDataElement,
  isSelecteParent,
  onCheckAllDataCategory,
}: DataCategoryListDataElementProps) => {
  const { data, isLoading, isError } =
    useListDataElementOfDataCategories({
      dataCategoryID: dataCategoryId,
      pageSize: 9999,
    });

  const [selectedRowKeys, setSelectedRowKeys] =
    useState<React.Key[]>();

  useEffect(() => {
    if (
      isSelecteParent &&
      data &&
      !selectedRowKeys &&
      exitingDataElement.length === 0
    ) {
      const KeySelected = data?.data.map((v) => {
        return v.dataElementID;
      });
      const dataElements = data?.data?.filter((item) =>
        KeySelected.includes(item.dataElementID)
      );

      setSelectedRowKeys(KeySelected as React.Key[]);
      selectDataElement(
        dataElements,
        dataCategoryId,
        isSelecteParent
      );
    } else if (
      isSelecteParent &&
      data &&
      !selectedRowKeys &&
      exitingDataElement.length > 0
    ) {
      const dataElements = data?.data?.filter((item) =>
        exitingDataElement.includes(item.dataElementID)
      );
      setSelectedRowKeys(
        exitingDataElement as React.Key[]
      );
      selectDataElement(
        dataElements,
        dataCategoryId,
        isSelecteParent
      );
    }
  }, [
    isSelecteParent,
    data,
    selectedRowKeys,
    exitingDataElement,
  ]);

  useEffect(() => {
    if (!isSelecteParent) {
      setSelectedRowKeys(undefined);
      selectDataElement(
        [],
        dataCategoryId,
        isSelecteParent
      );
    }
  }, [isSelecteParent]);

  const columns: ColumnsType<DataElementOfCategories> = [
    {
      title: (
        <IntlMessage id="dataMapping.dataCategoryPicker.dataElement.name" />
      ),
      key: 'name',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategoryPicker.dataElement.Classification" />
      ),
      dataIndex: 'dataClassificationID',
      key: 'dataClassification',
      width: 200,
      render: (dataClassification) => (
        <TagItems
          tags={[dataClassification]}
          items={[
            {
              key: 'general-data',
              label: (
                <IntlMessage id="dataMapping.dataCategoryPicker.dataClassifications.generalData" />
              ),
              color: CANCELED_COLOR,
            },
            {
              key: 'personal-data',
              label: (
                <IntlMessage id="dataMapping.dataCategoryPicker.dataClassifications.personalData" />
              ),
              color: PROCESSING_COLOR,
            },
            {
              key: 'sensitive-data',
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
  return (
    <FallbackError isError={isError}>
      <Table
        columns={columns}
        dataSource={data?.data ?? []}
        loading={isLoading}
        pagination={false}
        rowSelection={{
          selectedRowKeys,
          onChange: (newSelectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
            const dataElements = data?.data?.filter(
              (item) =>
                newSelectedRowKeys.includes(
                  item.dataElementID
                )
            );

            if (newSelectedRowKeys.length > 0) {
              onCheckAllDataCategory(true);
            } else {
              onCheckAllDataCategory(false);
            }
            selectDataElement(
              dataElements as DataElementOfCategories[],
              dataCategoryId,
              true
            );
          },
          getCheckboxProps: (record) => ({
            name: record.name,
          }),
        }}
        rowKey="dataElementID"
        tableLayout="fixed"
        scroll={{
          x: 400,
        }}
      />
    </FallbackError>
  );
};
