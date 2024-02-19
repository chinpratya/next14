import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { DashboardCountSchema } from '../schemas';
import { DashboardCount } from '../types';

type GetDashboardCount = {
  duration?: string;
};

export const getDashboardCount = async ({
  duration,
}: GetDashboardCount): Promise<DashboardCount> => {
  const { data } = await apiClient.get(
    `/dashboard/count`,
    {
      params: { duration },
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return DashboardCountSchema.parse(data);
};

type UseGetDashboardCount = GetDashboardCount;

export const useGetDashboardCount = ({
  duration,
}: UseGetDashboardCount) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.dashboard.all,
        duration,
      ],
      queryFn: () => getDashboardCount({ duration }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
