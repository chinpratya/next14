import { ReactNode } from 'react';

import { SmtpConfig } from '@/features/admin';
import { AppLayout } from '@/layouts';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const SMTPPAAGE = () => {
  return (
    <>
      <PageHeader
        title={<IntlMessage id="admin.config.smtp" />}
      />
      <SmtpConfig />
    </>
  );
};

SMTPPAAGE.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default SMTPPAAGE;
