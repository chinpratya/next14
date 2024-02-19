import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { useRouter } from 'next/router';

import { SlaList } from '@/features/incident-management';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { FallbackError } from '@utilComponents/fallback-error';

export const SlaPage = () => {
  const router = useRouter();

  const pushPage = () => {
    router.push(`${router.asPath}/create`);
  };

  return (
    <FallbackError isError={false}>
      <>
        <PageHeader
          title="SERVICE LEVEL AGREEMENT (SLA)"
          extra={
            <Button
              // style={{ display: 'none' }}
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={pushPage}
            >
              สร้างข้อตกลงระดับการให้บริการ
            </Button>
          }
        />
        <Card>
          <SlaList />
        </Card>
      </>
    </FallbackError>
  );
};

SlaPage.getLayout = (page: React.ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default SlaPage;
