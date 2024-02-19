import { Row, Col } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  AppCookieLayout,
  useGetDashboard,
  DashboardAccepted,
  DashboardAcceptCategory,
} from '@/features/cookie-management';
import { tokens } from '@/lang';
import { permissions, products } from '@/permissions';
import { getColLayout } from '@/utils';
import { PageHeader } from '@components/page-header';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

const DashboardPage = () => {
  const router = useRouter();

  const domainId = router.query.domainId as string;

  const { data, isLoading, isError } =
    useGetDashboard(domainId);

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage
            id={tokens.cookieManagement.dashboard.title}
          />
        }
      />
      <Row gutter={[10, 10]}>
        <Col {...getColLayout([24, 24, 24, 24, 24, 12])}>
          <DashboardAccepted
            data={data?.accept}
            isLoading={isLoading}
          />
        </Col>
        <Col {...getColLayout([24, 24, 24, 24, 24, 12])}>
          <DashboardAcceptCategory
            domainId={domainId}
            data={data?.category}
            isLoading={isLoading}
          />
        </Col>
      </Row>
    </FallbackError>
  );
};

DashboardPage.getLayout = (page: ReactNode) => (
  <AppCookieLayout
    permission={{
      moduleName: ['cookie'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:cookie:dashboard:read'],
      ],
    }}
  >
    {page}
  </AppCookieLayout>
);

export default DashboardPage;
