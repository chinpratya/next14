import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Loading } from '@/components/share-components/loading';
import {
  SwitchOrganizationResponse,
  useSwitchOrganization,
} from '@/features/admin';
import { queryClient } from '@/lib/react-query';
import { authStore } from '@/stores/auth';

const SwitchOrganizationPage = () => {
  const { query, replace } = useRouter();
  const { getState, setState } = authStore;

  const { submit } = useSwitchOrganization({
    onSuccess: (data: SwitchOrganizationResponse) => {
      setState(data);
      replace((query?.previousPath as string) ?? '/apps');
    },
    onError: () => {
      getState().logout();
    },
  });

  const departmentId = query?.departmentId as string;
  const refreshToken = getState()?.refresh_token;

  useEffect(() => {
    if (departmentId || refreshToken) {
      queryClient.clear();
      submit({
        departmentId,
        refresh_token: refreshToken,
      });
    } else {
      replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loading cover="page" />;
};

export default SwitchOrganizationPage;
