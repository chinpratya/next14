import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';

import { PolicyTemplateSchema } from '../schemas';
import { PolicyTemplate } from '../types';

export const getPolicyTemplate =
  async (): Promise<PolicyTemplate> => {
    const { data } = await apiClient.get(
      `/policyNotices/template`,
      {
        baseURL:
          API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
      }
    );

    return PolicyTemplateSchema.parse(data);
  };

export const useGetPolicyTemplate = () => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        policyManagementQueryKeys.policy.template,
      ],
      queryFn: () => getPolicyTemplate(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
