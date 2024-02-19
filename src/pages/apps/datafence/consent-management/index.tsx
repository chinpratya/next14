import { useRouter } from 'next/router';
import { useEffect, ReactNode } from 'react';

import { AppLayout } from '@/layouts';
import { consentManagementNavigation } from '@/navigations/consent-management';
import { Loading } from '@components/loading';

const ConsentManagementPage = () => {
  const { replace } = useRouter();

  useEffect(() => {
    const redirectPage = async () => {
      const [firstPage] =
        await consentManagementNavigation();
      if (firstPage) {
        if (firstPage.children) {
          replace(firstPage.children[0].key, undefined, {
            shallow: true,
          });
          return;
        }

        replace(firstPage.key, undefined, {
          shallow: true,
        });
      } else {
        replace(
          '/apps/datafence/consent-management/dashboard',
          undefined,
          {
            shallow: true,
          }
        );
      }
    };

    redirectPage();
  }, [replace]);
  return (
    <>
      <Loading cover="content" />
    </>
  );
};

ConsentManagementPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default ConsentManagementPage;
