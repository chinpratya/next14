import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';

export const getTenantStorage =
  async (): Promise<number> => {
    const { data } = await apiClient.get(
      `/core/tenant/storage`,
      {
        baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
      }
    );
    return data;
  };

export const useGetTenantStorage = () => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [coreQueryKeys.tenantStorage.all],
      queryFn: () => getTenantStorage(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
