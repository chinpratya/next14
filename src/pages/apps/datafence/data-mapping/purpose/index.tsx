import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { PurposeList } from '@/features/data-mapping';
import { PermissionWrapper } from '@/features/shared';
import { permissions, products } from '@/permissions';
import { removeQuery } from '@/utils';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';
import { IntlMessage } from '@utilComponents/intl-message';

const Purpose = () => {
  const router = useRouter();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dataMapping.purpose.title" />
        }
        extra={
          <PermissionWrapper
            moduleName={'datamap'}
            policies={[
              permissions[
                'pdpakit:datamap:purpose:create'
              ],
            ]}
          >
            <Button
              type="primary"
              icon={
                <PlusCircleOutlined className="mr-1" />
              }
              onClick={() =>
                router.push(
                  `${removeQuery(router.asPath)}/create`
                )
              }
            >
              {
                <IntlMessage id="dataMapping.purpose.create" />
              }
            </Button>
          </PermissionWrapper>
        }
      />
      <PurposeList />
    </>
  );
};

Purpose.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['datamap'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:datamap:purpose:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default Purpose;
