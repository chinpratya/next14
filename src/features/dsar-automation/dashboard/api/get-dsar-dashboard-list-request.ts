import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';

import { DashboardRequestsSchema } from '../schemas';
import { DashboardRequests } from '../types';

export const getDsarDashboardListRequest =
  async (): Promise<DashboardRequests[]> => {
    const { data } = await apiClient.get(
      `/dashboard/listofrequest`,
      {
        baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
      }
    );

    return z.array(DashboardRequestsSchema).parse(data);
  };

export const useGetDsarDashboardListRequest = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dsarAutomationQueryKeys.dashboard.request,
      ],
      queryFn: () => getDsarDashboardListRequest(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
