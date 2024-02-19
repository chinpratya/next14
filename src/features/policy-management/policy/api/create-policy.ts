import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createPolicy = async (
  data: Record<string, unknown>
): Promise<void> => {
  await apiClient.post(`/policyNotices`, data, {
    baseURL:
      API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
  });
};

export type UseCreatePolicy = {
  onSuccess?: () => void;
};

export const useCreatePolicy = ({
  onSuccess,
}: UseCreatePolicy) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createPolicy,
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
  };
};
