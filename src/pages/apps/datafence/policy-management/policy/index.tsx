import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  Policy,
  PolicyList,
} from '@/features/policy-management';
import { PermissionWrapper } from '@/features/shared';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const PolicyPage = () => {
  const router = useRouter();

  const onEdit = (policy: Policy) =>
    router.push(`${router.asPath}/${policy.ObjectUUID}`);

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="policyManagement.policy.title" />
        }
        extra={
          <PermissionWrapper
            moduleName={'policy'}
            policies={[
              permissions[
                'pdpakit:policy:document:create'
              ],
            ]}
          >
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() =>
                router.push(`${router.asPath}/create`)
              }
            >
              <IntlMessage id="policyManagement.policy.create.title" />
            </Button>
          </PermissionWrapper>
        }
      />
      <PolicyList onEdit={onEdit} />
    </>
  );
};

PolicyPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['policy'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:policy:document:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default PolicyPage;
