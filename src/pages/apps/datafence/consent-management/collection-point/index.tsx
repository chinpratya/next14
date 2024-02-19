import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactNode } from 'react';

import {
  CollectionPointCreateModal,
  CollectionPointList,
} from '@/features/consent-management';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const CollectionPointPage = () => {
  const toggle = useToggle();
  // pdpakit:consent:collectionpoint:create
  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="consentManagement.collectionPoint.title" />
        }
        extra={
          <PermissionWrapper
            moduleName={'consent'}
            policies={[
              permissions[
                'pdpakit:consent:collectionpoint:create'
              ],
            ]}
          >
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => toggle.create()}
            >
              {' '}
              <IntlMessage id="consentManagement.collectionPoint.create" />
            </Button>
          </PermissionWrapper>
        }
      />
      <CollectionPointList />
      <CollectionPointCreateModal
        open={toggle.openCreate}
        onClose={() => toggle.create()}
      />
    </>
  );
};

CollectionPointPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['consent'],
      productName: products.pdpakit,
      policies: [
        permissions[
          'pdpakit:consent:collectionpoint:read'
        ],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default CollectionPointPage;
