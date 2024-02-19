import { Row, Col, Typography, Select } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  DashboardOptionsContentPolicy,
  DashboardTotalNumberOfPolicy,
  // DashboardStatusTask,
  DashboardStatusPolicy,
  useGetPolicyDashboard,
  PolicyDashboardStatus,
} from '@/features/policy-management';
import { permissions, products } from '@/permissions';
import { getColLayout } from '@/utils';
import { Flex } from '@components/flex';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

type SelectedDuration = 'day' | 'week' | 'month' | 'year';

export const DashboardPage = () => {
  const { t } = useTranslation();

  const [selectedDuration, setSelectedDuration] =
    useState<SelectedDuration>('year');

  const { data, isError, isLoading } =
    useGetPolicyDashboard({ duration: selectedDuration });

  if (isLoading) {
    return <Loading cover={'content'} />;
  }

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage id="policyManagement.dashboard.title" />
        }
        extra={
          <Flex
            justifyContent="center"
            alignItems="center"
          >
            <Typography.Text className="mr-2">
              <IntlMessage id="policyManagement.dashboard.select" />{' '}
              :
            </Typography.Text>
            <Select
              style={{ width: 200 }}
              placeholder={
                t(
                  'policyManagement.dashboard.select'
                ) as string
              }
            />
          </Flex>
        }
      />
      <DashboardOptionsContentPolicy
        selectedDuration={selectedDuration}
        onDurationChange={(newDuration) =>
          setSelectedDuration(newDuration)
        }
      />
      <DashboardTotalNumberOfPolicy data={data} />
      <Row gutter={[20, 2]}>
        <Col {...getColLayout([24, 24, 24, 24, 24, 12])}>
          <DashboardStatusPolicy
            data={
              data?.policy_status as PolicyDashboardStatus[]
            }
          />
        </Col>
        {/* <Col {...getColLayout([24, 24, 24, 24, 24, 12])}>
          <DashboardStatusTask
            data={
              data?.task_status as PolicyDashboardStatus[]
            }
          />
        </Col> */}
      </Row>
    </FallbackError>
  );
};

DashboardPage.getLayout = (page: React.ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['policy'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:policy:dashboard:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default DashboardPage;
