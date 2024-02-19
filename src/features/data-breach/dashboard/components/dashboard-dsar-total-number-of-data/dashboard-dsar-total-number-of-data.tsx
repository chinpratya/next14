import { Col, Row, Skeleton } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { ShowCardCount } from '@/components/share-components/show-card-count';
import { getColLayout } from '@/utils';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetDsarDashboardCount } from '../../api/get-dsar-dashboard-count';

export type DashboardDsarTotalNumberOfDataProps = {
  duration?: string;
};

export const DashboardDsarTotalNumberOfData = ({
  duration,
}: DashboardDsarTotalNumberOfDataProps) => {
  const router = useRouter();

  const { data, isLoading, isError } =
    useGetDsarDashboardCount({
      duration,
    });

  const onViewRequestStatus = (status: string[]) =>
    router.push(
      `/apps/datafence/data-breach/request?requestStatus=${status}`,
      undefined,
      {
        shallow: true,
      }
    );

  return (
    <FallbackError isError={isError}>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Row
          justify={'space-between'}
          align={'middle'}
          gutter={[10, 10]}
          className="mb-3"
        >
          <Col {...getColLayout([24, 24, 24, 24, 8, 8])}>
            <ShowCardCount
              number={data?.requestCount ?? 0}
              title={
                <IntlMessage id="dsarAutomation.dashboard.requestReceived" />
              }
              icon={
                <Image
                  src={
                    '/img/dsar-automation/request-received.png'
                  }
                  alt=""
                  width={50}
                  height={50}
                />
              }
              color="#0052B4"
              onClick={() =>
                onViewRequestStatus(['opened'])
              }
            />
          </Col>
          <Col {...getColLayout([24, 24, 24, 24, 8, 8])}>
            <ShowCardCount
              number={data?.inprocressCount ?? 0}
              title={
                <IntlMessage id="dsarAutomation.dashboard.requestsInProgress" />
              }
              icon={
                <Image
                  src={
                    '/img/dsar-automation/requests-in-progress.png'
                  }
                  alt=""
                  width={50}
                  height={50}
                />
              }
              color="#D87B00"
              onClick={() =>
                onViewRequestStatus(['in_progress'])
              }
            />
          </Col>
          <Col {...getColLayout([24, 24, 24, 24, 8, 8])}>
            <ShowCardCount
              number={data?.completeCount ?? 0}
              title={
                <IntlMessage id="dsarAutomation.dashboard.requestSuccessful" />
              }
              icon={
                <Image
                  src={
                    '/img/dsar-automation/request-success.png'
                  }
                  alt=""
                  width={50}
                  height={50}
                />
              }
              color="#005745"
              onClick={() =>
                onViewRequestStatus(['close'])
              }
            />
          </Col>
        </Row>
      )}
    </FallbackError>
  );
};
