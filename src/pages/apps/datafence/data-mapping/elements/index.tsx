import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

import {
  ElementsCreateModal,
  ElementsList,
} from '@/features/data-mapping';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const ElementsPage = () => {
  const toggle = useToggle();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dataMapping.dataElement.titleList" />
        }
        extra={
          <PermissionWrapper
            moduleName={'datamap'}
            policies={[
              permissions[
                'pdpakit:datamap:elements:create'
              ],
            ]}
          >
            <Button
              type="primary"
              icon={
                <PlusCircleOutlined className="mr-1" />
              }
              onClick={toggle.create}
            >
              {
                <IntlMessage id="dataMapping.dataElement.create" />
              }
            </Button>
          </PermissionWrapper>
        }
      />
      <ElementsList />
      <ElementsCreateModal
        open={toggle.openCreate}
        onCancel={toggle.create}
      />
    </>
  );
};

ElementsPage.getLayout = (page: React.ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['datamap'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:datamap:elements:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default ElementsPage;
