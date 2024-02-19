import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

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

type CategariesType = {
  dataCategoryID: string;
  elements: string[];
};

type ActivityBasisPurposeAddDataCategoryExpandProps = {
  dataCategoryId: string;
  onCheckAllDataCategory: (id: boolean) => void;
  selectDataElement: (data: CategariesType) => void;
};

export const ActivityBasisPurposeAddDataCategoryExpand =
  ({
    dataCategoryId,
    onCheckAllDataCategory,
    selectDataElement,
  }: ActivityBasisPurposeAddDataCategoryExpandProps) => {
    const { data, isLoading, isError } =
      useListDataElementOfDataCategories({
        dataCategoryID: dataCategoryId,
        pageSize: 9999,
      });

    const [selectedRowKeys, setSelectedRowKeys] =
      useState<React.Key[]>();
    const columns: ColumnsType<DataElementOfCategories> =
      [
        {
          title: (
            <IntlMessage id="dataMapping.dataCategoryPicker.dataElement.name" />
          ),
          dataIndex: 'name',
          width: 200,
        },
        {
          title: (
            <IntlMessage id="dataMapping.dataCategoryPicker.dataElement.Classification" />
          ),
          dataIndex: 'dataClassificationID',
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
      <div>
        <FallbackError isError={isError}>
          <Table
            columns={columns}
            dataSource={data?.data ?? []}
            loading={isLoading}
            pagination={false}
            rowSelection={{
              selectedRowKeys,
              onChange: (
                newSelectedRowKeys: React.Key[]
              ) => {
                setSelectedRowKeys(newSelectedRowKeys);

                if (newSelectedRowKeys.length > 0) {
                  onCheckAllDataCategory(true);
                } else {
                  onCheckAllDataCategory(false);
                }
                selectDataElement({
                  dataCategoryID: dataCategoryId,
                  elements:
                    newSelectedRowKeys as string[],
                });
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
      </div>
    );
  };
