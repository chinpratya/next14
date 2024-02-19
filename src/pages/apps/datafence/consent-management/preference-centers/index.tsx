import { ReactNode } from 'react';

import { PreferenceCentersList } from '@/features/consent-management';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const PreferenceCentersPage = () => {
  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="consentManagement.preferenceCenters.title" />
        }
      />
      <PreferenceCentersList />
    </>
  );
};

PreferenceCentersPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['consent'],
      productName: products.pdpakit,
      policies: [
        permissions[
          'pdpakit:consent:preferencecenters:read'
        ],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default PreferenceCentersPage;
