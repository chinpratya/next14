import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { siemNavigation } from '@/navigations/siem';
import { Loading } from '@components/loading';

const SiemPage = () => {
  const { replace } = useRouter();

  useEffect(() => {
    const redirectPage = async () => {
      const [firstPage] = await siemNavigation();

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

export default SiemPage;
