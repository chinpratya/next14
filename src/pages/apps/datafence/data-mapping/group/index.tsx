import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

import { GroupList } from '@/features/data-mapping';
import { PermissionWrapper } from '@/features/shared';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const GroupPage = () => {
  const router = useRouter();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dataMapping.group.title" />
        }
        extra={
          <PermissionWrapper
            moduleName={'datamap'}
            policies={[
              permissions['pdpakit:datamap:group:create'],
            ]}
          >
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() =>
                router.push(`${router.pathname}/create`)
              }
            >
              {' '}
              <IntlMessage id="dataMapping.group.create" />
            </Button>
          </PermissionWrapper>
        }
      />
      <GroupList />
    </>
  );
};

GroupPage.getLayout = (page: React.ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['datamap'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:datamap:group:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default GroupPage;
