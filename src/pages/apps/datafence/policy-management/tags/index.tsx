import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactNode } from 'react';

import {
  PolicyTagsCreateModal,
  TagsList,
} from '@/features/policy-management';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

const TagsPage = () => {
  const toggle = useToggle();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="policyManagement.tag.title" />
        }
        extra={
          <PermissionWrapper
            moduleName={'policy'}
            policies={[
              permissions['pdpakit:policy:tag:create'],
            ]}
          >
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => toggle.create()}
            >
              {' '}
              <IntlMessage id="policyManagement.tag.create.title" />
            </Button>
          </PermissionWrapper>
        }
      />
      <TagsList />
      <PolicyTagsCreateModal
        open={toggle.openCreate}
        onClose={() => toggle.create()}
      />
    </>
  );
};

TagsPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['policy'],
      productName: products.pdpakit,
      policies: [permissions['pdpakit:policy:tag:read']],
    }}
  >
    {page}
  </AppLayout>
);

export default TagsPage;
