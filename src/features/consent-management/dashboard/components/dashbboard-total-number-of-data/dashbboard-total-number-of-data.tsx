import { Col, Row, Skeleton } from 'antd';
import Image from 'next/image';

import { ShowCardCount } from '@/components/share-components/show-card-count';
import { getColLayout } from '@/utils';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetDashboardCount } from '../../api/get-dashboard-count';

type DashboardTotalNumberOfDataProps = {
  selectedDuration: string;
};

export const DashboardTotalNumberOfData = ({
  selectedDuration,
}: DashboardTotalNumberOfDataProps) => {
  const { data, isError, isLoading } =
    useGetDashboardCount({ duration: selectedDuration });

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
              number={data?.SubjectIdentifierCount ?? 0}
              title={
                <IntlMessage id="consentManagement.dashboard.dataSubject" />
              }
              icon={
                <Image
                  src={'/img/people-icon.png'}
                  alt=""
                  width={50}
                  height={50}
                />
              }
              color="#20325E"
            />
          </Col>
          <Col {...getColLayout([24, 24, 24, 24, 8, 8])}>
            <ShowCardCount
              number={data?.ConsnetCount ?? 0}
              title={
                <IntlMessage id="consentManagement.dashboard.consent" />
              }
              icon={
                <Image
                  src={'/img/consent-icon.png'}
                  alt=""
                  width={50}
                  height={50}
                />
              }
              color="#7B61FF"
            />
          </Col>
          <Col {...getColLayout([24, 24, 24, 24, 8, 8])}>
            <ShowCardCount
              number={data?.TransactionCount ?? 0}
              title={
                <IntlMessage id="consentManagement.dashboard.transaction" />
              }
              icon={
                <Image
                  src={'/img/documents-icon.png'}
                  alt=""
                  width={50}
                  height={50}
                />
              }
              color="#006651"
            />
          </Col>
        </Row>
      )}
    </FallbackError>
  );
};
