import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Loading } from '@components/loading';

const CustomReportPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(`${router.asPath}/dashboard`);
  }, [router]);

  return <Loading cover="page" />;
};

export default CustomReportPage;
