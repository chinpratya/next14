import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { AppLayout } from '@/layouts';
import { dsarAutomationNavigation } from '@/navigations/dsar-automation';
import { Loading } from '@components/loading';

const DsarAutomationPage = () => {
  const { replace } = useRouter();

  useEffect(() => {
    const redirectPage = async () => {
      const [firstPage] =
        await dsarAutomationNavigation();
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
          '/apps/datafence/dsar-automation/dashboard',
          undefined,
          {
            shallow: true,
          }
        );
      }
    };

    redirectPage();
  }, [replace]);

  return <Loading cover="content" />;
};

DsarAutomationPage.getLayout = (
  page: React.ReactNode
) => <AppLayout>{page}</AppLayout>;

export default DsarAutomationPage;
