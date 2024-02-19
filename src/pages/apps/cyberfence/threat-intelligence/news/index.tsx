import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

import { NewsMainLayout } from '@/features/threat-intelligence';
import AppLayout from '@layouts/AppLayout';

const NewsPage = () => {
  const { replace, asPath } = useRouter();

  useEffect(() => {
    replace(`${asPath}/today`, undefined, {
      shallow: true,
    });
  }, [replace, asPath]);
};

NewsPage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout>
      <NewsMainLayout>{page}</NewsMainLayout>
    </AppLayout>
  );
};

export default NewsPage;
