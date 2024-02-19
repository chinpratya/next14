import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';

import { PolicyDetailSchema } from '../schemas';
import { PolicyDetail } from '../types';

export const getPolicy = async (
  policyId: string
): Promise<PolicyDetail> => {
  const { data } = await apiClient.get(
    `/policyNotices/${policyId}`,
    {
      baseURL:
        API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
    }
  );

  return PolicyDetailSchema.parse(data);
};

export const useGetPolicy = (policyId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        policyManagementQueryKeys.policy.detail(policyId),
      ],
      queryFn: () => getPolicy(policyId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
