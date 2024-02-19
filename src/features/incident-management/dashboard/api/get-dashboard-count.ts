import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';

import { DashboardCountResponseSchema } from '../schemas';
import { DashboardCountResponse } from '../types';

export type GetSlaList = Request & {
  [key: string]: unknown;
};

export const DashboardCount = async (
  duration: string
): Promise<DashboardCountResponse> => {
  const response = await apiClient.get(
    `/dashboard/count/?duration=${duration}`,
    {
      baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
    }
  );
  return DashboardCountResponseSchema.parse(response);
};

export const UseDashboardCount = (duration: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        incidentManagementQueryKeys.dashboard.count(
          duration
        ),
      ],
      queryFn: () => DashboardCount(duration),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
