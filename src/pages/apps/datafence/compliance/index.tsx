import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

import { AppLayout } from '@/layouts';
import { Loading } from '@components/loading';

const CompliancePage = () => {
  const { replace, asPath } = useRouter();

  useEffect(() => {
    replace(`${asPath}/dashboard`, undefined, {
      shallow: true,
    });
  }, [replace, asPath]);

  return <Loading cover="content" />;
};

CompliancePage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default CompliancePage;
