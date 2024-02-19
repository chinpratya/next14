import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';

import { PolicyVersionResponseSchema } from '../schemas';
import { PolicyVersionResponse } from '../types';

export const listPolicyVersion = async (
  policyId: string
): Promise<PolicyVersionResponse> => {
  const response = await apiClient.get(
    `/policyNotices/${policyId}/versions`,
    {
      baseURL:
        API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
    }
  );

  return PolicyVersionResponseSchema.parse(response);
};

export const useListPolicyVersion = (
  policyId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listPolicyVersion(policyId),
      queryKey: [
        policyManagementQueryKeys.policy.version(
          policyId
        ),
      ],
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
