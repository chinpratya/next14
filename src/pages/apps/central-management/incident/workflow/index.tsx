import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { useRouter } from 'next/router';

import { WorkflowList } from '@/features/incident-management';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { FallbackError } from '@utilComponents/fallback-error';
export const WorkflowPage = () => {
  const router = useRouter();

  const pushPage = () => {
    router.push(`${router.asPath}/create`);
  };

  return (
    <FallbackError isError={false}>
      <>
        <PageHeader
          title="Workflow"
          extra={
            <Button
              // style={{ display: 'none' }}
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={pushPage}
            >
              สร้างขั้นตอนการทำงาน
            </Button>
          }
        />
        <Card>
          <WorkflowList />
        </Card>
      </>
    </FallbackError>
  );
};

WorkflowPage.getLayout = (page: React.ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default WorkflowPage;
