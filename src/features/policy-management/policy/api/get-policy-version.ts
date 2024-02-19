import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';

import { PolicySchema } from '../schemas';
import { Policy } from '../types';

type GetPolicyVersion = {
  policyId: string;
  versionId: string;
};

export const getPolicyVersion = async ({
  policyId,
  versionId,
}: GetPolicyVersion): Promise<Policy> => {
  const { data } = await apiClient.get(
    `/policyNotices/${policyId}/versions/${versionId}`,
    {
      baseURL:
        API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
    }
  );

  return PolicySchema.parse(data);
};

export const useGetPolicyVersion = ({
  policyId,
  versionId,
}: GetPolicyVersion) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () =>
        getPolicyVersion({ policyId, versionId }),
      queryKey: [
        policyManagementQueryKeys.policy.versionDetail(
          policyId,
          versionId
        ),
      ],
      enabled: !!policyId && !!versionId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
