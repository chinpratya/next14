import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type DeletePolicyUser = {
  policyId: string;
  userId: string;
};
export const deletePolicyUser = ({
  policyId,
  userId,
}: DeletePolicyUser): Promise<void> =>
  apiClient.delete(
    `/policyNotices/${policyId}/users/${userId}`,
    {
      baseURL:
        API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
    }
  );

export type UseDeletePolicyUser = {
  onSuccess?: () => void;
  policyId: string;
};

export const useDeletePolicyUser = ({
  onSuccess,
  policyId,
}: UseDeletePolicyUser) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (userId: string) =>
      deletePolicyUser({ policyId, userId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        policyManagementQueryKeys.policy.user(policyId),
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
