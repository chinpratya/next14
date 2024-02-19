import { css } from '@emotion/css';
import { Row, Col, Card } from 'antd';

import {
  DashboardTotalNumberOfData,
  DashboardClassificationChart,
  DashboardDataElementChart,
  DashboardLawfulBasis,
  DashboardRightOfDataSubject,
  DashboardConset,
  DashboardDsar,
  DashboardThirdPartyLocation,
  DashboardThirdPartyGeo,
} from '@/features/data-mapping';
import { permissions, products } from '@/permissions';
import { getColLayout } from '@/utils';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

const DashboardPage = () => {
  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dataMapping.dashboard.tiltle" />
        }
      />
      <DashboardTotalNumberOfData />
      <Row
        gutter={[20, 2]}
        className={css`
          .ant-card-body {
            min-height: 310px !important;
          }
        `}
      >
        <Col {...getColLayout([24, 24, 24, 24, 24, 12])}>
          <DashboardDataElementChart />
        </Col>
        <Col {...getColLayout([24, 24, 24, 24, 24, 12])}>
          <DashboardClassificationChart />
        </Col>
        <Col {...getColLayout([24, 24, 24, 24, 24, 12])}>
          <DashboardLawfulBasis />
        </Col>
        <Col {...getColLayout([24, 24, 24, 24, 24, 12])}>
          <DashboardRightOfDataSubject />
        </Col>
        <Col {...getColLayout([24, 24, 24, 24, 24, 12])}>
          <DashboardConset />
        </Col>
        <Col {...getColLayout([24, 24, 24, 24, 24, 12])}>
          <DashboardDsar />
        </Col>
        <Card className="w-100">
          <Row
            gutter={[10, 10]}
            justify={'space-between'}
            align={'middle'}
          >
            <Col
              {...getColLayout([24, 24, 24, 24, 24, 12])}
            >
              <DashboardThirdPartyLocation />
            </Col>
            <Col
              {...getColLayout([24, 24, 24, 24, 24, 12])}
            >
              <DashboardThirdPartyGeo />
            </Col>
          </Row>
        </Card>
      </Row>
    </>
  );
};

DashboardPage.getLayout = (page: React.ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['datamap'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:datamap:dashboard:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default DashboardPage;
