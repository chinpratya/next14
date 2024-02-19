import { Collapse, Descriptions, Skeleton } from 'antd';

import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListDisclosurePurposeOfActivity } from '../../api/list-disclosure-purpose-of-activity';
import { ActivityDisclosurePurposeDestinationList } from '../../components/activity-disclosure-purpose-destination-list';
import { ActivityDisclosurePurpose } from '../../types';

export type ActivityDisclosurePurposeListProps = {
  activityId: string;
};

export const ActivityDisclosurePurposeDetail = ({
  lawBasis,
  dataCategories,
  dataElements,
  chanel,
  assetType,
  dataUsagePeriod,
  isDataRetentionPeriod,
  dataRetentionPeriod,
  storage,
  rightsAndMethodAccessPersonalInformation,
  source,
  methodRemoveWhenExpire,
}: ActivityDisclosurePurpose) => (
  <Descriptions
    className="mb-4"
    labelStyle={{
      fontWeight: 'bold',
    }}
    title="Purpose Detail"
    column={{
      xs: 1,
      sm: 1,
      md: 2,
      lg: 2,
      xl: 3,
      xxl: 3,
    }}
    layout="vertical"
  >
    <Descriptions.Item
      label={
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.legalBase" />
      }
    >
      {lawBasis}
    </Descriptions.Item>
    <Descriptions.Item
      label={
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.dataCategories" />
      }
    >
      {dataCategories?.map((category) => (
        <div
          className="mr-2"
          key={category.dataCategoryID}
        >
          {category.name}
        </div>
      ))}
    </Descriptions.Item>
    <Descriptions.Item
      label={
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.dataElement" />
      }
    >
      {dataElements?.map((element) => (
        <div className="mr-2" key={element.dataElementID}>
          {element.name}
        </div>
      ))}
    </Descriptions.Item>
    <Descriptions.Item
      label={
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.importChannel" />
      }
    >
      {chanel}
    </Descriptions.Item>
    <Descriptions.Item
      label={
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.dataStoreType" />
      }
    >
      {assetType?.map((type) => (
        <div className="mr-2" key={type}>
          {type}
        </div>
      ))}
    </Descriptions.Item>
    <Descriptions.Item
      label={
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.dataUsagePeriod" />
      }
    >
      {dataUsagePeriod &&
      dataUsagePeriod.year !== 0 &&
      dataUsagePeriod.month !== 0 &&
      dataUsagePeriod.day !== 0 ? (
        <>
          {dataUsagePeriod.year ?? 0}{' '}
          <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.dataUsagePeriod.year" />{' '}
          {dataUsagePeriod?.month ?? 0}{' '}
          <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.dataUsagePeriod.month" />{' '}
          {dataUsagePeriod?.day ?? 0}{' '}
          <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.dataUsagePeriod.day" />
        </>
      ) : (
        dataUsagePeriod?.description ?? '-'
      )}
    </Descriptions.Item>
    <Descriptions.Item
      label={
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.dataRetentionPeriod" />
      }
    >
      {isDataRetentionPeriod &&
      dataRetentionPeriod.year !== 0 &&
      dataRetentionPeriod.month !== 0 &&
      dataRetentionPeriod.day !== 0 ? (
        <>
          {dataRetentionPeriod.year ?? 0}{' '}
          <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.dataRetentionPeriod.year" />{' '}
          {dataRetentionPeriod?.month ?? 0}{' '}
          <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.dataRetentionPeriod.month" />{' '}
          {dataRetentionPeriod?.day ?? 0}{' '}
          <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.dataRetentionPeriod.day" />
        </>
      ) : (
        dataRetentionPeriod?.description ?? '-'
      )}
    </Descriptions.Item>
    <Descriptions.Item
      label={
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.storage" />
      }
    >
      {storage}
    </Descriptions.Item>
    <Descriptions.Item
      label={
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.source" />
      }
    >
      {source}
    </Descriptions.Item>
    <Descriptions.Item
      label={
        <IntlMessage id="dataMapping.activity.useAndPublic.disclosure.purpose.methodRemoveWhenExpire" />
      }
    >
      {methodRemoveWhenExpire}
    </Descriptions.Item>
  </Descriptions>
);

export const ActivityDisclosurePurposeList = ({
  activityId,
}: ActivityDisclosurePurposeListProps) => {
  const { data, isLoading, isError } =
    useListDisclosurePurposeOfActivity(activityId);

  if (isLoading) return <Skeleton />;

  if (data?.data?.length === 0) return null;

  const defaultActiveKey = data?.data?.map(
    (purpose) => purpose.purposeID
  );

  return (
    <FallbackError isError={isError}>
      <Collapse defaultActiveKey={defaultActiveKey}>
        {data?.data?.map((purpose) => (
          <Collapse.Panel
            header={purpose.name}
            key={purpose.purposeID}
            forceRender={false}
          >
            <ActivityDisclosurePurposeDetail
              {...purpose}
            />
            <div className="pl-4 pr-4">
              <ActivityDisclosurePurposeDestinationList
                activityId={activityId}
                purposeId={purpose.purposeID}
              />
            </div>
          </Collapse.Panel>
        ))}
      </Collapse>
    </FallbackError>
  );
};
