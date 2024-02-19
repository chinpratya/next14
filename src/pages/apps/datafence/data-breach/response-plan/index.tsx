import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { WorkFlowList } from '@/features/data-breach';
import { tokens } from '@/lang';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';
import { permissions, products } from '@/permissions';
import { PermissionWrapper } from '@/features/shared';

const ResponsePlanPage = () => {
  const router = useRouter();

  const onCreate = () => {
    router.push(`${router.asPath}/create`);
  };

  return (
    <>
      <PageHeader
        title={
          <IntlMessage
            id={tokens.dataBreach.responsePlan.title}
          />
        }
        extra={
          <PermissionWrapper
            moduleName={'databreach'}
            policies={[
              permissions[
                'pdpakit:databreach:responseplan:create'
              ],
            ]}
          >
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={onCreate}
            >
              <IntlMessage
                id={tokens.dataBreach.responsePlan.create}
              />
            </Button>
          </PermissionWrapper>
        }
      />
      <WorkFlowList />
    </>
  );
};

ResponsePlanPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['databreach'],
      productName: products.pdpakit,
      policies: [
        permissions[
          'pdpakit:databreach:responseplan:read'
        ],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default ResponsePlanPage;
