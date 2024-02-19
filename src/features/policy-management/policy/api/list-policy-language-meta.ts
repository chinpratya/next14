import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';

import { PolicyLangMetaSchema } from '../schemas';
import { PolicyLangMeta } from '../types';

export const listPolicyLanguageMeta =
  async (): Promise<PolicyLangMeta> => {
    const { data } = await apiClient.get(
      `/policyNotices/langMeta`,
      {
        baseURL:
          API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
      }
    );

    return PolicyLangMetaSchema.parse(data);
  };

export const useListPolicyLanguageMeta = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        policyManagementQueryKeys.policy.languageMeta,
      ],
      queryFn: () => listPolicyLanguageMeta(),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
