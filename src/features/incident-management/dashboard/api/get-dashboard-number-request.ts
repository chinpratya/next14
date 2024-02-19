import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';

import { DashboardListOfRequestSchema } from '../schemas';
import { DashboardListOfRequestResponse } from '../types';

export type GetSlaList = Request & {
  [key: string]: unknown;
};

export const DashboardNumberRequest = async (
  duration: string
): Promise<DashboardListOfRequestResponse> => {
  const response = await apiClient.get(
    `/dashboard/listofrequest/?duration=${duration}`,
    {
      baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
    }
  );
  return DashboardListOfRequestSchema.parse(response);
};

export const UseDashboardNumberRequest = (
  duration: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        incidentManagementQueryKeys.dashboard.list(
          duration
        ),
      ],
      queryFn: () => DashboardNumberRequest(duration),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
