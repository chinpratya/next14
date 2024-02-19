import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { AppLayout } from '@/layouts';
import { Loading } from '@components/loading';

const IncidentManagementPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(`${router.asPath}/dashboard`);
  }, [router]);

  return <Loading cover="content" />;
};

IncidentManagementPage.getLayout = (
  page: React.ReactNode
) => <AppLayout>{page}</AppLayout>;

export default IncidentManagementPage;
