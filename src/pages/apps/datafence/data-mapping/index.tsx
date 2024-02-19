import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { AppLayout } from '@/layouts';
import { dataMappingNavigation } from '@/navigations/data-mapping';
import { Loading } from '@components/loading';

const DataMappingPage = () => {
  const { replace } = useRouter();

  useEffect(() => {
    const redirectPage = async () => {
      const [firstPage] = await dataMappingNavigation();
      console.log('First page', firstPage);
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
          '/apps/datafence/data-mapping/dashboard',
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

DataMappingPage.getLayout = (page: React.ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default DataMappingPage;
