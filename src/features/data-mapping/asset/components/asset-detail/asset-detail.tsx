import { Descriptions } from 'antd';

import { ShowTagDate } from '@/components/share-components/show-tag-date';
import { IntlMessage } from '@utilComponents/intl-message';

import { AssetInfo } from '../../types';

type AssetDetailProps = {
  asset?: AssetInfo;
};

export const AssetDetail = ({
  asset,
}: AssetDetailProps) => {
  return (
    <Descriptions
      layout="vertical"
      column={{
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 4,
        xxl: 4,
      }}
      labelStyle={{ fontWeight: 'bold' }}
    >
      <Descriptions.Item
        label={
          <IntlMessage id="dataMapping.asset.createdDt" />
        }
      >
        <ShowTagDate date={asset?.created_dt ?? '-'} />
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="dataMapping.asset.createdBy" />
        }
      >
        {asset?.created_by ?? '-'}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="dataMapping.asset.updatedDt" />
        }
      >
        <ShowTagDate date={asset?.updated_dt ?? '-'} />
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <IntlMessage id="dataMapping.asset.updatedBy" />
        }
      >
        {asset?.updated_by ?? '-'}
      </Descriptions.Item>
    </Descriptions>
  );
};
