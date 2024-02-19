import { ReactNode } from 'react';

import { PurposeList } from '@/features/consent-management';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const PurposePage = () => {
  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="consentManagement.purpose.title" />
        }
      />
      <PurposeList />
    </>
  );
};

PurposePage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['consent'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:consent:purpose:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default PurposePage;
