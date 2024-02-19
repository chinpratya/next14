import { ReactNode } from 'react';

import { AccessLogList } from '@/features/admin';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const AccessLog = () => {
  return (
    <>
      <PageHeader title="Access Log" />
      <AccessLogList />
    </>
  );
};

AccessLog.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default AccessLog;
