import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';

export const checkOrganization = async (): Promise<{
  status: boolean;
}> => {
  const { data } = await apiClient.get(
    `/core/tenant/status`,
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
  return data;
};

export const useCheckOrganization = () => {
  const {
    data,
    isFetching,
    isFetched,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => checkOrganization(),
    queryKey: [coreQueryKeys.tenantStatus.detail],
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
    refetch,
  };
};
