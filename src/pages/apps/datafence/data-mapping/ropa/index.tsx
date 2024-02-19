import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactNode } from 'react';

import {
  RopaCreateModal,
  RopaList,
} from '@/features/data-mapping';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';
const RopaPage = () => {
  const toggle = useToggle();
  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dataMapping.ropa.title" />
        }
        extra={
          <PermissionWrapper
            moduleName={'datamap'}
            policies={[
              permissions['pdpakit:datamap:ropa:create'],
            ]}
          >
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => toggle.create()}
            >
              {' '}
              <IntlMessage id="dataMapping.ropa.create" />
            </Button>
          </PermissionWrapper>
        }
      />
      <RopaList />
      <RopaCreateModal
        open={toggle.openCreate}
        onCancel={() => toggle.create()}
      />
    </>
  );
};

RopaPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['datamap'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:datamap:ropa:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default RopaPage;
