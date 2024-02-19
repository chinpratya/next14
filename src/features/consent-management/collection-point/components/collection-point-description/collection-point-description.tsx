import { Card, Descriptions } from 'antd';

import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { IntlMessage } from '@utilComponents/intl-message';

import { ConsentCollectionPointDetail } from '../../types';

type CollectionPointDescriptionProps = {
  data: ConsentCollectionPointDetail;
  loading: boolean;
};

export const CollectionPointDescription = ({
  data,
  loading,
}: CollectionPointDescriptionProps) => {
  return (
    <Card loading={loading}>
      <Descriptions
        title={data?.name}
        layout="vertical"
        labelStyle={{ fontWeight: 'bold' }}
      >
        <Descriptions.Item
          label={
            <IntlMessage id="consentManagement.collectionPoint.detail.description.collectionPointId" />
          }
        >
          {data?.CollectionPointID}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="consentManagement.collectionPoint.detail.description.version" />
          }
        >
          {data?.version}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="consentManagement.collectionPoint.detail.description.createdDt" />
          }
        >
          <ShowTagDate date={data?.createdDt} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="consentManagement.collectionPoint.detail.description.publishedDt" />
          }
        >
          <ShowTagDate date={data?.updatedDt} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <IntlMessage id="consentManagement.collectionPoint.detail.description.status" />
          }
        >
          <ShowTagStatus status={data?.status} />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
