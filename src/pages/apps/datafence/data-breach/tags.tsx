import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactNode } from 'react';

import {
  TagsList,
  TagsCreateModal,
} from '@/features/data-breach';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { tokens } from '@/lang';
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
          <IntlMessage
            id={tokens.dataBreach.tags.title}
          />
        }
        extra={
          <PermissionWrapper
            moduleName={'databreach'}
            policies={[
              permissions[
                'pdpakit:databreach:tag:create'
              ],
            ]}
          >
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={toggle.create}
            >
              <IntlMessage
                id={tokens.dataBreach.tags.create}
              />
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
      moduleName: ['databreach'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:databreach:tag:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default TagsPage;
