import { ReactNode } from 'react';

import { ActivityList } from '@/features/risk-assessment';
import { tokens } from '@/lang';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const ActivityPage = () => {
  return (
    <>
      <PageHeader
        title={
          <IntlMessage
            id={tokens.riskAssessment.activity.title}
          />
        }
      />
      <ActivityList />
    </>
  );
};

ActivityPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['assessment'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:assessment:activity:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default ActivityPage;
