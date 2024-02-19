import { Collapse, Descriptions, Skeleton } from 'antd';
import _ from 'lodash';

import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetCollectionPointElement } from '../../../api/get-collection-point-element';

const { Panel } = Collapse;

type CollectionPointConfigurationProps = {
  collectionPointsId: string;
};

export const CollectionPointConfiguration = ({
  collectionPointsId,
}: CollectionPointConfigurationProps) => {
  const { data, isLoading, isError } =
    useGetCollectionPointElement(collectionPointsId);

  return (
    <FallbackError isError={isError}>
      <Collapse defaultActiveKey={['1']}>
        <Panel
          header={
            <IntlMessage id="consentManagement.collectionPoint.configuration.header" />
          }
          key={'1'}
        >
          {!isLoading ? (
            <Descriptions column={1}>
              <Descriptions.Item
                label={
                  <IntlMessage id="consentManagement.collectionPoint.configuration.dataSubjectIdentifier" />
                }
                labelStyle={{ fontWeight: 'bold' }}
              >
                {data?.dataSubjectIdentifier}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <IntlMessage id="consentManagement.collectionPoint.configuration.purpose" />
                }
                labelStyle={{ fontWeight: 'bold' }}
              >
                {_.map(
                  data?.purposes,
                  (v) => v.purpose
                ).join(',')}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <IntlMessage id="consentManagement.collectionPoint.configuration.dataElement" />
                }
                labelStyle={{ fontWeight: 'bold' }}
              >
                {_.map(
                  data?.dataElements,
                  (v) => v.dataElement
                ).join(',')}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <Skeleton active />
          )}
        </Panel>
      </Collapse>
    </FallbackError>
  );
};
