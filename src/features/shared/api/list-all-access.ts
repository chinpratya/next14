import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_ORGANIZATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { adminQueryKeys } from '@/lib/queryKeys';
import { authStore } from '@/stores/auth';

export const listAllAccess = async (): Promise<
  Record<string, string[]>
> => {
  const { data } = await apiClient.get(
    `/user/auth/permission`,
    {
      baseURL: API_ENDPOINT_ORGANIZATION_BASE_URL,
    }
  );
  return data;
};

export const useListAllAccess = () => {
  const { data, isFetching, isError } = useQuery({
    queryFn: () => listAllAccess(),
    queryKey: [adminQueryKeys.user.accessMoule],
    onSuccess: (data: Record<string, string[]>) => {
      authStore.setState({
        permissions: data,
        accessModule: data?.accessmodule ?? undefined,
      });
    },
  });

  return {
    data,
    isLoading: isFetching,
    isError,
  };
};
