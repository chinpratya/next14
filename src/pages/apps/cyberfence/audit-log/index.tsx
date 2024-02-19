import { ReactElement } from 'react';

import { SystemUsageHistory } from '@/features/audit-log';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const AuditLog = () => {
  return (
    <>
      <PageHeader title="ประวัติการใช้งานระบบ" />
      <SystemUsageHistory />
    </>
  );
};

AuditLog.getLayout = function getLayout(
  page: ReactElement
) {
  return <AppLayout>{page}</AppLayout>;
};

export default AuditLog;
