import { Select, Typography } from 'antd';
import React, { useState } from 'react';

import {
  DashboardTotalNumberOfData,
  DashboardOptionsContent,
  DashboardSummaryOfConsentService,
  DashboardSummaryOfConsentActivity,
  DashboardSummaryOfConsentPolicy,
} from '@/features/consent-management';
import { permissions, products } from '@/permissions';
import { Flex } from '@components/flex';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

type SelectedDuration = 'day' | 'week' | 'month' | 'year';

const DashboardPage = () => {
  const [selectedDuration, setSelectedDuration] =
    useState<SelectedDuration>('year');

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="consentManagement.dashboard.title" />
        }
        extra={
          <Flex
            justifyContent="center"
            alignItems="center"
          >
            <Typography.Text className="mr-2">
              <IntlMessage id="consentManagement.dashboard.select" />
              :
            </Typography.Text>
            <Select
              style={{ width: 200 }}
              placeholder={
                <IntlMessage id="consentManagement.dashboard.select" />
              }
            />
          </Flex>
        }
      />
      <DashboardOptionsContent
        selectedDuration={selectedDuration}
        onDurationChange={(newDuration) =>
          setSelectedDuration(newDuration)
        }
      />
      <DashboardTotalNumberOfData
        selectedDuration={selectedDuration}
      />
      <DashboardSummaryOfConsentService
        selectedDuration={selectedDuration}
      />
      <DashboardSummaryOfConsentActivity
        selectedDuration={selectedDuration}
      />
      <DashboardSummaryOfConsentPolicy
        selectedDuration={selectedDuration}
      />
    </>
  );
};

DashboardPage.getLayout = (page: React.ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['consent'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:consent:dashboard:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default DashboardPage;
