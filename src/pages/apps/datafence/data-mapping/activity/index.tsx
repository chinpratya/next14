import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  ActivityList,
  Activity,
} from '@/features/data-mapping';
import { PermissionWrapper } from '@/features/shared';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const ActivityPage = () => {
  const router = useRouter();

  const onEditActivity = (activity: Activity) =>
    router.push(
      `${router.asPath}/${activity.ObjectUUID}`
    );

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dataMapping.activity.title" />
        }
        extra={
          <PermissionWrapper
            moduleName={'datamap'}
            policies={[
              permissions[
                'pdpakit:datamap:activity:create'
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
              {' '}
              <IntlMessage id="dataMapping.activity.create" />
            </Button>
          </PermissionWrapper>
        }
      />
      <ActivityList onEdit={onEditActivity} />
    </>
  );
};

ActivityPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['datamap'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:datamap:activity:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default ActivityPage;
