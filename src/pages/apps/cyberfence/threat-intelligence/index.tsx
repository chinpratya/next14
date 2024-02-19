import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Loading } from '@components/loading';

const ThreatIntelligencePage = () => {
  const { replace, asPath } = useRouter();

  useEffect(() => {
    replace(`${asPath}/dashboard`, undefined, {
      shallow: true,
    });
  }, [replace, asPath]);

  return <Loading cover="page" />;
};

export default ThreatIntelligencePage;
