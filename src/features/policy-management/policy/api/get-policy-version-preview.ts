import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { z } from 'zod';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';

export type GetPolicyVersionPreview = {
  policyId: string;
  versionId: string;
};

export const getPolicyVersionPreview = async ({
  policyId,
  versionId,
}: GetPolicyVersionPreview): Promise<string> => {
  const response = await apiClient.get(
    `/policyNotices/${policyId}/versions/${versionId}/preview`,
    {
      baseURL:
        API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
    }
  );

  return z.string().parse(_.get(response, 'body'));
};

export const useGetPolicyVersionPreview = ({
  policyId,
  versionId,
}: GetPolicyVersionPreview) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () =>
        getPolicyVersionPreview({ policyId, versionId }),
      queryKey: [
        policyManagementQueryKeys.policy.versionPreview(
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
