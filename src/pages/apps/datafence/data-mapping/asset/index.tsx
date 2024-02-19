import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { AssetList } from '@/features/data-mapping';
import { PermissionWrapper } from '@/features/shared';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const AssetPage = () => {
  const router = useRouter();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dataMapping.asset.list" />
        }
        extra={
          <PermissionWrapper
            moduleName={'datamap'}
            policies={[
              permissions['pdpakit:datamap:asset:create'],
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
              <IntlMessage id="dataMapping.asset.create" />
            </Button>
          </PermissionWrapper>
        }
      />
      <AssetList />
    </>
  );
};

AssetPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['datamap'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:datamap:asset:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default AssetPage;
