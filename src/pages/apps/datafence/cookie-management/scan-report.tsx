import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  AppCookieLayout,
  DashboardCategory,
  useGetScanReport,
  DashboardThirdParty,
  DashboardCookiesExpired,
  DashboardCookieClassification,
  DashboardUserTrackingTechnology,
} from '@/features/cookie-management';
import { tokens } from '@/lang';
import { permissions, products } from '@/permissions';
import { getColLayout } from '@/utils';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const ScanReportPage = () => {
  const router = useRouter();

  const domainId = router.query.domainId as string;

  const { data, isLoading, isError } =
    useGetScanReport(domainId);

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage
            id={tokens.cookieManagement.scanReport.title}
          />
        }
      />
      <Row gutter={[24, 24]}>
        <Col {...getColLayout(12)}>
          <DashboardCategory
            domainId={domainId}
            data={data?.categories}
            isLoading={isLoading}
          />
        </Col>
        <Col {...getColLayout(12)}>
          <DashboardThirdParty
            data={data?.typePerson}
            isLoading={isLoading}
          />
        </Col>
        <Col {...getColLayout(12)}>
          <DashboardCookiesExpired
            data={data?.Expiration}
            isLoading={isLoading}
          />
        </Col>
        <Col {...getColLayout(12)}>
          <DashboardCookieClassification
            data={data?.Classified}
            isLoading={isLoading}
          />
        </Col>
        <Col {...getColLayout(12)}>
          <DashboardUserTrackingTechnology
            data={data?.technology}
            isLoading={isLoading}
          />
        </Col>
      </Row>
    </FallbackError>
  );
};

ScanReportPage.getLayout = (page: ReactNode) => (
  <AppCookieLayout
    permission={{
      moduleName: ['cookie'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:cookie:reportscan:read'],
      ],
    }}
  >
    {page}
  </AppCookieLayout>
);

export default ScanReportPage;
