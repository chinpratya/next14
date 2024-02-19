import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '@/stores/auth';
import { Loading } from '@components/loading';

export default function Home() {
  const { replace } = useRouter();
  const { access_token } = useAuth();

  useEffect(() => {
    if (access_token) {
      replace('/apps', undefined, { shallow: true });
    }

    if (!access_token) {
      replace('/auth/login', undefined, {
        shallow: true,
      });
    }
  }, [access_token, replace]);

  return <Loading cover="content" />;
}
