import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactNode } from 'react';

import {
  TagsList,
  TagsCreateModal,
} from '@/features/dsar-automation';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const DsarAutomationTagsPage = () => {
  const toggle = useToggle();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dsarAutomation.tags.title" />
        }
        extra={
          <PermissionWrapper
            moduleName={'dsar'}
            policies={[
              permissions['pdpakit:dsar:tag:create'],
            ]}
          >
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={toggle.create}
            >
              <IntlMessage id="dsarAutomation.tags.create" />
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

DsarAutomationTagsPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['dsar'],
      productName: products.pdpakit,
      policies: [permissions['pdpakit:dsar:tag:read']],
    }}
  >
    {page}
  </AppLayout>
);

export default DsarAutomationTagsPage;
