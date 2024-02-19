import { Flex } from '@mantine/core';
import { Button, Col, Row } from 'antd';
import { useRouter } from 'next/router';

import {
  // SlaBasicInfo,
  WorkflowBasicInfo,
  WorkflowTaskList,
} from '@/features/incident-management';
import { getColLayout } from '@/utils';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { FallbackError } from '@utilComponents/fallback-error';

export const DashboardPage = () => {
  const router = useRouter();

  return (
    <FallbackError isError={false}>
      <PageHeader
        onBack={router.back}
        title="รายละเอียดแผนการตอบสนอง"
        extra={
          <>
            <Flex>
              <Button
                style={{ marginRight: 10 }}
                onClick={() => {
                  router.back();
                }}
              >
                {' '}
                ยกเลิก
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  router.push(
                    `/apps/datafence/incident-management/workflow`
                  );
                }}
              >
                {' '}
                บันทึก
              </Button>
            </Flex>
          </>
        }
      />
      <Row gutter={[24, 24]}>
        <Col {...getColLayout(24)}>
          <WorkflowBasicInfo />
        </Col>
        <Col {...getColLayout(24)}>
          <WorkflowTaskList />
        </Col>
      </Row>
    </FallbackError>
  );
};

DashboardPage.getLayout = (page: React.ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default DashboardPage;
