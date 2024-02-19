import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { complianceQueryKeys } from '@/lib/queryKeys';

import { DashboardMetaResponseSchema } from '../schemas/dashboard';
import { DashboardMetaResponse } from '../types/dashboard';

export const getDashboardMeta =
  async (): Promise<DashboardMetaResponse> => {
    const data = await apiClient.get(`/dashboard-meta`, {
      baseURL: API_ENDPOINT_COMPLIANCE_BASE_URL,
    });
    return DashboardMetaResponseSchema.parse(data);
  };

export const useGetDashboardMeta = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [complianceQueryKeys.dashboard.meta],
      queryFn: () => getDashboardMeta(),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
