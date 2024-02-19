import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import {
  CANCELED_COLOR,
  ERROR_COLOR,
  PROCESSING_COLOR,
} from '@/config/color';
import { TagItems } from '@components/tag-items';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListDataElementOfDataCategories } from '../../api/list-data-element-of-data-categories';
import { DataElementOfCategories } from '../../types';

export type DataCategoryListDataElementProps = {
  dataCategoryId: string;
};

export const DataCategoryListDataElement = ({
  dataCategoryId,
}: DataCategoryListDataElementProps) => {
  const { data, isLoading, isError } =
    useListDataElementOfDataCategories({
      dataCategoryID: dataCategoryId,
      pageSize: 9999,
    });

  const columns: ColumnsType<DataElementOfCategories> = [
    {
      title: (
        <IntlMessage id="dataMapping.dataCategoryPicker.dataElement.name" />
      ),
      dataIndex: 'name',
      width: '50%',
    },
    {
      title: (
        <IntlMessage id="dataMapping.dataCategoryPicker.dataElement.dataClassification" />
      ),
      dataIndex: 'dataClassificationID',
      width: '50%',
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
        dataSource={data?.data}
        loading={isLoading}
        rowKey="dataElementID"
        pagination={false}
      />
    </FallbackError>
  );
};
