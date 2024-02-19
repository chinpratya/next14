import { ReactNode } from 'react';

import {
  AppCookieLayout,
  CookieConsentList,
} from '@/features/cookie-management';
import { tokens } from '@/lang';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const CookieConsentPage = () => {
  return (
    <>
      <PageHeader
        title={
          <IntlMessage
            id={
              tokens.cookieManagement.cookieConsent.title
            }
          />
        }
      />
      <CookieConsentList />
    </>
  );
};

CookieConsentPage.getLayout = (page: ReactNode) => (
  <AppCookieLayout
    permission={{
      moduleName: ['cookie'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:cookie:consent:read'],
      ],
    }}
  >
    {page}
  </AppCookieLayout>
);
export default CookieConsentPage;
