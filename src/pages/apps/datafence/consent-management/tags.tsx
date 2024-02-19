import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactNode } from 'react';

import {
  TagsCreateModal,
  TagsList,
} from '@/features/consent-management';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const TagsPage = () => {
  const toggle = useToggle();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="consentManagement.tags.title" />
        }
        extra={
          <PermissionWrapper
            moduleName={'consent'}
            policies={[
              permissions['pdpakit:consent:tag:create'],
            ]}
          >
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={toggle.create}
            >
              {' '}
              <IntlMessage id="consentManagement.tags.create" />
            </Button>
          </PermissionWrapper>
        }
      />
      <TagsList />
      <TagsCreateModal
        open={toggle.openCreate}
        onClose={toggle.create}
      />
    </>
  );
};

TagsPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['consent'],
      productName: products.pdpakit,
      policies: [permissions['pdpakit:consent:tag:read']],
    }}
  >
    {page}
  </AppLayout>
);

export default TagsPage;
