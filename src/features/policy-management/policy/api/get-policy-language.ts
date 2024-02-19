import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';

import { PolicyLanguageDetailSchema } from '../schemas';
import { PolicyLanguageDetail } from '../types';

type GetPolicyLanguage = {
  policyId: string;
  languageId: string;
};
export const getPolicyLanguage = async ({
  policyId,
  languageId,
}: GetPolicyLanguage): Promise<PolicyLanguageDetail> => {
  const { data } = await apiClient.get(
    `/policyNotices/${policyId}/language/${languageId}`,
    {
      baseURL:
        API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
    }
  );

  return PolicyLanguageDetailSchema.parse(data);
};

type UseGetPolicyLanguage = {
  policyId: string;
  languageId: string;
};
export const useGetPolicyLanguage = ({
  policyId,
  languageId,
}: UseGetPolicyLanguage) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () =>
        getPolicyLanguage({ policyId, languageId }),
      queryKey: [
        policyManagementQueryKeys.policy.languageDetail(
          policyId,
          languageId
        ),
      ],
      enabled: !!policyId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
