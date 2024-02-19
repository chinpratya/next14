import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { z } from 'zod';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';

export const getPolicyPreview = async (
  policyId: string,
  lang?: string
): Promise<string> => {
  const response = await apiClient.get(
    `/policyNotices/${policyId}/preview`,
    {
      baseURL:
        API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
      params: {
        lang,
      },
    }
  );

  return z.string().parse(_.get(response, 'body'));
};

export type UseGetPolicyPreview = {
  policyId: string;
  lang?: string;
};

export const useGetPolicyPreview = ({
  policyId,
  lang,
}: UseGetPolicyPreview) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => getPolicyPreview(policyId, lang),
      queryKey: [
        policyManagementQueryKeys.policy.preview(
          policyId
        ),
        lang,
      ],
      enabled: !!policyId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
