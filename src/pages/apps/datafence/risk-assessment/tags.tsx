import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ReactNode } from 'react';

import {
  TagsList,
  TagsCreateModal,
} from '@/features/risk-assessment';
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
            id={tokens.riskAssessment.tags.title}
          />
        }
        extra={
          <PermissionWrapper
            moduleName={'assessment'}
            policies={[
              permissions[
                'pdpakit:assessment:tag:create'
              ],
            ]}
          >
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={toggle.create}
            >
              <IntlMessage
                id={tokens.riskAssessment.tags.create}
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
      moduleName: ['assessment'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:assessment:tag:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default TagsPage;
