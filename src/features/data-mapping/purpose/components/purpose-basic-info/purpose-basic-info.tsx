import { Descriptions } from 'antd';

import { ShowTagDate } from '@components/show-tag-date';
import { IntlMessage } from '@utilComponents/intl-message';

import { Purpose } from '../../types';

export type PurposeDetailInfoBaseDetailProps = {
  data: Purpose;
};

export const PurposeBasicInfo = ({
  data,
}: PurposeDetailInfoBaseDetailProps) => {
  return (
    <Descriptions
      title={
        <IntlMessage id="dataMapping.purpose.detail" />
      }
      layout="vertical"
      labelStyle={{
        fontWeight: 'bold',
      }}
      column={{
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 4,
        xxl: 4,
      }}
    >
      <Descriptions.Item
        label={
          <IntlMessage id="dataMapping.purpose.detail.createdDt" />
        }
      >
        <ShowTagDate date={data?.created_dt ?? '-'} />
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="dataMapping.purpose.detail.createdBy" />
        }
      >
        {data?.created_by ?? '-'}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="dataMapping.purpose.detail.updatedDt" />
        }
      >
        <ShowTagDate date={data?.updated_dt ?? '-'} />
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="dataMapping.purpose.detail.updatedBy" />
        }
      >
        {data?.updated_by ?? '-'}
      </Descriptions.Item>
    </Descriptions>
  );
};
