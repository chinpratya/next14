import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deletePolicy = (
  policyId: string
): Promise<void> =>
  apiClient.delete(`/policyNotices/${policyId}`, {
    baseURL:
      API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
  });

export type UseDeletePolicy = {
  onSuccess?: () => void;
};

export const useDeletePolicy = ({
  onSuccess,
}: UseDeletePolicy = {}) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deletePolicy,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        policyManagementQueryKeys.policy.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
    isError,
  };
};
