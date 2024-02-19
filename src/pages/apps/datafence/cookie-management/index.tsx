import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { cookieManagementNavigation } from '@/navigations/cookie-management';
import { Loading } from '@components/loading';

const CookieManagementPage = () => {
  const { replace, query } = useRouter();

  useEffect(() => {
    const redirectPage = async () => {
      const [firstPage] =
        await cookieManagementNavigation(query);
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
          '/apps/datafence/cookie-management/dashboard',
          undefined,
          {
            shallow: true,
          }
        );
      }
    };

    redirectPage();
  }, [replace, query]);

  return <Loading cover="content" />;
};

export default CookieManagementPage;
