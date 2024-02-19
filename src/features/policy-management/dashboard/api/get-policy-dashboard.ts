import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';

import { PolicyDashboardSchema } from '../schemas';
import { PolicyDashboard } from '../types';

type GetPolicyDashboard = {
  duration?: string;
};

export const getPolicyDashboard = async ({
  duration,
}: GetPolicyDashboard): Promise<PolicyDashboard> => {
  const { data } = await apiClient.get(`/dashboard`, {
    params: { duration },
    baseURL:
      API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
  });

  return PolicyDashboardSchema.parse(data);
};

type UseGetPolicyDashboard = GetPolicyDashboard;

export const useGetPolicyDashboard = ({
  duration,
}: UseGetPolicyDashboard) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        policyManagementQueryKeys.dashboard.all,
        duration,
      ],
      queryFn: () => getPolicyDashboard({ duration }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
