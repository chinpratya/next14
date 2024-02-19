import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { AppLayout } from '@/layouts';
import { policyManagementNavigation } from '@/navigations/policy-management';
import { Loading } from '@components/loading';

const PolicyManagementPage = () => {
  const { replace } = useRouter();

  useEffect(() => {
    const redirectPage = async () => {
      const [firstPage] =
        await policyManagementNavigation();
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
          '/apps/datafence/policy-management/dashboard',
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

PolicyManagementPage.getLayout = (
  page: React.ReactNode
) => <AppLayout>{page}</AppLayout>;

export default PolicyManagementPage;
