import { Flex } from '@mantine/core';
import { Card, Button } from 'antd';
import { useRouter } from 'next/router';

import { WorkflowTaskForm } from '@/features/incident-management';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { FallbackError } from '@utilComponents/fallback-error';

export const DashboardPage = () => {
  const router = useRouter();
  return (
    <FallbackError isError={false}>
      <PageHeader
        onBack={router.back}
        title="สร้างTask"
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
                    `/apps/datafence/incident-management/workflow/task`
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
      <Card>
        <WorkflowTaskForm />
      </Card>
    </FallbackError>
  );
};

DashboardPage.getLayout = (page: React.ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default DashboardPage;
