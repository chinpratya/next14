import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';

import { PolicyUserResponseSchema } from '../schemas';
import { PolicyUserResponse } from '../types';

export const listPolicyUsers = async (
  policyId: string
): Promise<PolicyUserResponse> => {
  const response = await apiClient.get(
    `/policyNotices/${policyId}/users`,
    {
      baseURL:
        API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
    }
  );

  return PolicyUserResponseSchema.parse(response);
};

export const useListPolicyUsers = (policyId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listPolicyUsers(policyId),
      queryKey: [
        policyManagementQueryKeys.policy.user(policyId),
      ],
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
