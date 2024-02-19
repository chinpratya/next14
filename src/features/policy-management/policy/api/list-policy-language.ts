import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';

import { PolicyLanguageResponseSchema } from '../schemas';
import { PolicyLanguageResponse } from '../types';

export const listPolicyLanguage = async (
  policyId: string
): Promise<PolicyLanguageResponse> => {
  const resp = await apiClient.get(
    `/policyNotices/${policyId}/language`,
    {
      baseURL:
        API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
    }
  );

  return PolicyLanguageResponseSchema.parse(resp);
};

export const useListPolicyLanguage = (
  policyId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        policyManagementQueryKeys.policy.language(
          policyId
        ),
      ],
      queryFn: () => listPolicyLanguage(policyId),
      keepPreviousData: true,
      enabled: !!policyId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
