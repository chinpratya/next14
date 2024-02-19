import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useGetToken } from '@/features/auth';
import { useAuth } from '@/stores/auth';
import { Loading } from '@components/loading';

const LoginCodeVerificationPage = () => {
  const router = useRouter();
  const { authenticate } = useAuth();
  const organizationId = router.query
    .organizationId as string;
  const { submit } = useGetToken({
    onSuccess: (data) => {
      authenticate({
        ...data,
        role: undefined,
        access_role: 'apps',
      });
      router.replace(`/apps`, undefined, {
        shallow: true,
      });
    },
    onError: () => {
      router.push('/auth/login');
    },
  });

  useEffect(() => {
    if (!router.asPath.includes('organizationId')) {
      const hash = router.asPath.split('#')[1],
        query = hash?.split('&'),
        code = query?.find((item) =>
          item.includes('code')
        );

      const tokenCode = code?.split('=')[1] ?? '';
      if (!tokenCode || !organizationId) {
        router.push('/auth/login');
      }

      submit({
        code: tokenCode,
        organization: organizationId,
        redirect_uri: `${window.location.origin}/auth/login/${organizationId}`,
      });
    }
  }, [submit, organizationId, router]);

  return <Loading cover="page" />;
};

export default LoginCodeVerificationPage;
