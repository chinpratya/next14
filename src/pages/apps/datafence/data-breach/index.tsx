import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { dataBreachNavigation } from '@/navigations/data-breach';
import { Loading } from '@components/loading';

const DataBreachPage = () => {
  const { replace } = useRouter();

  useEffect(() => {
    const redirectPage = async () => {
      const [firstPage] = await dataBreachNavigation();
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
          '/apps/datafence/data-breach/dashboard',
          undefined,
          {
            shallow: true,
          }
        );
      }
    };

    redirectPage();
  }, [replace]);

  return <Loading cover="page" />;
};

export default DataBreachPage;
