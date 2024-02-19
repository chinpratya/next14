import { ReactNode } from 'react';

import { AssessmentDashboardContent } from '@/features/compliance';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const AssessmentDashboard = () => {
  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="compliance.dashboard.title" />
        }
      />
      <AssessmentDashboardContent />
    </>
  );
};

AssessmentDashboard.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['compliance'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:compliance:dashboard:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default AssessmentDashboard;
