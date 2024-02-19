import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const publishPolicy = async (
  policyId: string,
  isNewVersion: boolean
) =>
  await apiClient.post(
    `/policyNotices/${policyId}/publish`,
    {},
    {
      baseURL:
        API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
      params: {
        isNewVersion,
      },
    }
  );

export type UsePublishPolicy = {
  policyId: string;
  onSuccess?: () => void;
};

export const usePublishPolicy = ({
  policyId,
  onSuccess,
}: UsePublishPolicy) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (isNewVersion: boolean) =>
      publishPolicy(policyId, isNewVersion),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        policyManagementQueryKeys.policy.detail(policyId),
      ]);
      await queryClient.invalidateQueries([
        policyManagementQueryKeys.policy.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
