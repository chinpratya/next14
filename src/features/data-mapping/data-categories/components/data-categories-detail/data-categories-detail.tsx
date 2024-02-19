import { Card, Descriptions } from 'antd';

import { ShowTagDate } from '@components/show-tag-date';
import { IntlMessage } from '@utilComponents/intl-message';

import { DataCategory } from '../../types';

type DataCategoriesDetailProps = {
  data?: DataCategory;
};

export const DataCategoriesDetail = ({
  data,
}: DataCategoriesDetailProps) => {
  return (
    <Card
      title={<IntlMessage id="dataMapping.basicInfo" />}
    >
      <Descriptions
        column={4}
        layout="vertical"
        labelStyle={{ fontWeight: 'bold' }}
      >
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataCategories.detail.createdDt" />
          }
        >
          <ShowTagDate date={data?.created_dt} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataCategories.detail.createdBy" />
          }
        >
          {data?.created_by}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataCategories.detail.updatedDt" />
          }
        >
          <ShowTagDate date={data?.updated_dt} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataCategories.detail.updatedBy" />
          }
        >
          {data?.updated_by}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
