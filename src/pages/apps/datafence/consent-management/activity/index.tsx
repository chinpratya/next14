import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { ActivityList } from '@/features/consent-management';
import { Activity } from '@/features/data-mapping';
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
          <IntlMessage id="consentManagement.activity.title" />
        }
      />
      <ActivityList onEdit={onEditActivity} />
    </>
  );
};

ActivityPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['consent'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:consent:activity:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default ActivityPage;
