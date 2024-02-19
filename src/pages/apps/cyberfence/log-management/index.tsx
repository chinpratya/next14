import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { logManagementNavigation } from '@/navigations/log-management';
import { Loading } from '@components/loading';

const LogManagementPage = () => {
  const { replace } = useRouter();

  useEffect(() => {
    const redirectPage = async () => {
      const [firstPage] = await logManagementNavigation();

      if (firstPage.children) {
        replace(firstPage.children[0].key, undefined, {
          shallow: true,
        });
        return;
      }

      replace(firstPage.key, undefined, {
        shallow: true,
      });
    };

    redirectPage();
  }, [replace]);

  return <Loading cover="page" />;
};

export default LogManagementPage;
