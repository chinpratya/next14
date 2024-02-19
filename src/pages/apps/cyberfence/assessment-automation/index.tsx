import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Loading } from '@components/loading';

const CompliancePage = () => {
  const { replace, asPath } = useRouter();

  useEffect(() => {
    replace(`${asPath}/assessment-dashboard`, undefined, {
      shallow: true,
    });
  }, [replace, asPath]);

  return <Loading cover="page" />;
};

export default CompliancePage;
