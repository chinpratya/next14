import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { PolicyResponseSchema } from '../schemas';
import { PolicyResponse } from '../types';

export const listPolicy = async (
  params: Request
): Promise<PolicyResponse> => {
  const response = await apiClient.get(`/policyNotices`, {
    baseURL:
      API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
    params,
  });

  return PolicyResponseSchema.parse(response);
};

export const useListPolicy = (params: Request) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        policyManagementQueryKeys.policy.all,
        params,
      ],
      queryFn: () => listPolicy(params),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
