import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { WorkFlowList } from '@/features/dsar-automation';
import { PermissionWrapper } from '@/features/shared';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const WorkFlowPage = () => {
  const router = useRouter();

  const onCreate = () => {
    router.push(`${router.asPath}/create`);
  };

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dsarAutomation.setting.workflow.title" />
        }
        extra={
          <PermissionWrapper
            moduleName={'dsar'}
            policies={[
              permissions['pdpakit:dsar:workflow:create'],
            ]}
          >
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={onCreate}
            >
              <IntlMessage id="dsarAutomation.setting.workflow.create" />
            </Button>
          </PermissionWrapper>
        }
      />
      <WorkFlowList />
    </>
  );
};

WorkFlowPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['dsar'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:dsar:workflow:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default WorkFlowPage;
