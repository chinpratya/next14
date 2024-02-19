import { ReactNode } from 'react';

import { AuditLogList } from '@/features/admin';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const AuditLog = () => {
  return (
    <>
      <PageHeader title="Audit Log" />
      <AuditLogList />
    </>
  );
};

AuditLog.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default AuditLog;
