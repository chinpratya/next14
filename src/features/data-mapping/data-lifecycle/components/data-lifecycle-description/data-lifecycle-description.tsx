import { Card, Descriptions } from 'antd';

import { IntlMessage } from '@utilComponents/intl-message';

import { DataLifecycle } from '../../types';

export type DataLifecycleDescriptionProps = {
  data?: DataLifecycle;
};

export const DataLifecycleDescription = ({
  data,
}: DataLifecycleDescriptionProps) => {
  return (
    <Card
      title={
        <IntlMessage id="dataMapping.dataLifecycle.detail.basicInfo" />
      }
    >
      <Descriptions
        layout="vertical"
        labelStyle={{ fontWeight: 'bold' }}
      >
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.name" />
          }
        >
          {data?.name}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.owner" />
          }
        >
          {data?.owner}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="dataMapping.dataLifecycle.group" />
          }
        >
          {data?.group}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
