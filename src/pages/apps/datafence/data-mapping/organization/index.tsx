import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactNode } from 'react';

import {
  OrganizationLists,
  OrganizationCreateModal,
} from '@/features/data-mapping';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const OrganizationPage = () => {
  const toggle = useToggle();
  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dataMapping.organization.title" />
        }
        extra={
          <PermissionWrapper
            moduleName={'datamap'}
            policies={[
              permissions[
                'pdpakit:datamap:organization:create'
              ],
            ]}
          >
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => toggle.create()}
            >
              {' '}
              <IntlMessage id="dataMapping.organization.create" />
            </Button>
          </PermissionWrapper>
        }
      />
      <OrganizationLists />
      <OrganizationCreateModal
        open={toggle.openCreate}
        onClose={() => toggle.create()}
      />
    </>
  );
};

OrganizationPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['datamap'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:datamap:organization:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default OrganizationPage;
