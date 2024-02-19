import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { FallbackError } from '@utilComponents/fallback-error';
import { TriggerList } from '@/features/incident-management/trigger/components/trigger-list';
import { useRouter } from 'next/router';
export const TriggerPage = () => {
  const router = useRouter();
  return (
    <FallbackError isError={false}>
      <>
        <PageHeader
          title="Configure Form Rules"
          extra={
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() =>
                router.push(
                  '/apps/central-management/incident/trigger/create'
                )
              }
            >
              ADD Rule
            </Button>
          }
        />
        <Card>
          <TriggerList />
        </Card>
      </>
    </FallbackError>
  );
};

TriggerPage.getLayout = (page: React.ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default TriggerPage;
