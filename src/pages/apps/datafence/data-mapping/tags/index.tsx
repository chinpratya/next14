import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactNode } from 'react';

import {
  TagsCreateModal,
  TagsList,
} from '@/features/data-mapping';
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
          <IntlMessage id="dataMapping.tags.title" />
        }
        extra={
          <PermissionWrapper
            moduleName={'datamap'}
            policies={[
              permissions['pdpakit:datamap:tag:create'],
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
      <TagsList />
      <TagsCreateModal
        open={toggle.openCreate}
        onClose={() => toggle.create()}
        tagId={toggle?.data?.tagID}
      />
    </>
  );
};

TagsPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['datamap'],
      productName: products.pdpakit,
      policies: [permissions['pdpakit:datamap:tag:read']],
    }}
  >
    {page}
  </AppLayout>
);

export default TagsPage;
