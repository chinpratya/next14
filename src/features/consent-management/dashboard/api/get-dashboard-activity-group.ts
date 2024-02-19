import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { DashboardActivityGroupSchema } from '../schemas';
import { DashboardActivityGroup } from '../types';

type GetDashboardActivityGroup = {
  duration?: string;
};

export const getDashboardActivityGroup = async ({
  duration,
}: GetDashboardActivityGroup): Promise<DashboardActivityGroup> => {
  const { data } = await apiClient.get(
    `/dashboard/activity/group`,
    {
      params: { duration },
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return DashboardActivityGroupSchema.parse(data);
};

type UseGetDashboardActivityGroup =
  GetDashboardActivityGroup;

export const useGetDashboardActivityGroup = ({
  duration,
}: UseGetDashboardActivityGroup) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.dashboard
          .activityGroup,
        duration,
      ],
      queryFn: () =>
        getDashboardActivityGroup({ duration }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
