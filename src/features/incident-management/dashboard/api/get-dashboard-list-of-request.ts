import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';

import { DashboardByTimeResponseSchema } from '../schemas';
import { DashboardByTimeResponse } from '../types';

export type GetSlaList = Request & {
  [key: string]: unknown;
};

export const DashboardListOfRequest = async (
  duration: string
): Promise<DashboardByTimeResponse> => {
  const response = await apiClient.get(
    `/dashboard/bytime/?duration=${duration}`,

    {
      baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
    }
  );

  return DashboardByTimeResponseSchema.parse(response);
};

export const UseDashboardListOfRequest = (
  duration: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        incidentManagementQueryKeys.dashboard.detail(
          duration
        ),
      ],
      queryFn: () => DashboardListOfRequest(duration),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
