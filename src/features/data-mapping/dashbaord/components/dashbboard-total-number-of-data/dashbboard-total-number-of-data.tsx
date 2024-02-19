import { Col, Row, Skeleton } from 'antd';
import Image from 'next/image';

import { ShowCardCount } from '@/components/share-components/show-card-count';
import { getColLayout } from '@/utils';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetDashboardCount } from '../../api/get-dashboard-count';

export const DashboardTotalNumberOfData = () => {
  const { data, isError, isLoading } =
    useGetDashboardCount();

  return (
    <FallbackError isError={isError}>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Row
          justify={'space-between'}
          align={'middle'}
          gutter={[20, 20]}
          className="mb-3"
        >
          <Col {...getColLayout([24, 24, 24, 24, 6, 6])}>
            <ShowCardCount
              number={data?.activityCount ?? 0}
              title={
                <IntlMessage id="dataMapping.dashboard.activities" />
              }
              icon={
                <Image
                  src={
                    '/img/data-mapping/activity-processing.png'
                  }
                  alt=""
                  width={55}
                  height={50}
                />
              }
              color="#3364FD"
            />
          </Col>
          <Col {...getColLayout([24, 24, 24, 24, 6, 6])}>
            <ShowCardCount
              number={data?.dataElementCount ?? 0}
              title={
                <IntlMessage id="dataMapping.dashboard.dataset" />
              }
              icon={
                <Image
                  src={'/img/data-mapping/data-set.png'}
                  alt=""
                  width={50}
                  height={50}
                />
              }
              color="#006651"
            />
          </Col>
          <Col {...getColLayout([24, 24, 24, 24, 6, 6])}>
            <ShowCardCount
              number={data?.purposeCount ?? 0}
              title={
                <IntlMessage id="dataMapping.dashboard.purpose" />
              }
              icon={
                <Image
                  src={'/img/data-mapping/purpose.png'}
                  alt=""
                  width={50}
                  height={50}
                />
              }
              color="rgba(96, 0, 171, 1)"
            />
          </Col>
          <Col {...getColLayout([24, 24, 24, 24, 6, 6])}>
            <ShowCardCount
              number={data?.assetCount ?? 0}
              title={
                <IntlMessage id="dataMapping.dashboard.asset" />
              }
              icon={
                <Image
                  src={'/img/data-mapping/asset.png'}
                  alt=""
                  width={50}
                  height={50}
                />
              }
              color="rgba(0, 0, 0, 0.8)"
            />
          </Col>
        </Row>
      )}
    </FallbackError>
  );
};
