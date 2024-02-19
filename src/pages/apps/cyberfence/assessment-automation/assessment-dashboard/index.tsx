import { ReactNode } from 'react';

import { AssessmentDashboardContent } from '@/features/compliance';
import { AppLayout } from '@/layouts';
import { PageHeader } from '@components/page-header';

const AssessmentDashboard = () => {
  return (
    <>
      <PageHeader title="แดชบอร์ด" />
      <AssessmentDashboardContent />
    </>
  );
};

AssessmentDashboard.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default AssessmentDashboard;
