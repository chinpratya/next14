import { Col, Row } from 'antd';
import { ReactElement } from 'react';

import { PageHeader } from '@/components/share-components/page-header';
import {
  DashboardAttackCategoriesChart,
  DashboardAttackCategoriesInfo,
  DashboardPopularNews,
  DashboardTypesOfIndicators,
} from '@/features/threat-intelligence';
import { getColLayout } from '@/utils';
import AppLayout from '@layouts/AppLayout';

const DashboardPage = () => {
  return (
    <>
      <PageHeader title="Dashboard" />

      <Row gutter={[16, 16]}>
        <Col {...getColLayout(15)}>
          <DashboardAttackCategoriesChart />
        </Col>
        <Col {...getColLayout(9)}>
          <DashboardAttackCategoriesInfo />
        </Col>
        <Col {...getColLayout(12)}>
          <DashboardTypesOfIndicators />
        </Col>
        <Col {...getColLayout(12)}>
          <DashboardPopularNews />
        </Col>
      </Row>
    </>
  );
};

DashboardPage.getLayout = function getLayout(
  page: ReactElement
) {
  return <AppLayout>{page}</AppLayout>;
};

export default DashboardPage;
