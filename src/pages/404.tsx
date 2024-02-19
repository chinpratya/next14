import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { authStore } from '@/stores/auth';
import { Loading } from '@components/loading';
import AppLayout from '@layouts/AppLayout';
import { PageNotFound } from '@utilComponents/page-not-found';

const PageNotFoundPage = () => {
  const { access_token } = authStore.getState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const onBack = () => router.back();
  const onHome = () =>
    router.replace('/', undefined, {
      shallow: true,
    });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [access_token]);

  if (loading) return <Loading cover="page" />;

  if (access_token)
    return (
      <AppLayout navSideEnable={false}>
        <PageNotFound
          onBack={onBack}
          onHome={onHome}
          withLayout
        />
      </AppLayout>
    );

  return <PageNotFound onBack={onBack} onHome={onHome} />;
};

export default PageNotFoundPage;
