import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type UpdatePolicy = {
  policyId: string;
  data: Record<string, unknown>;
};

export const updatePolicy = async ({
  policyId,
  data,
}: UpdatePolicy): Promise<void> => {
  return apiClient.put(
    `/policyNotices/${policyId}`,
    data,
    {
      baseURL:
        API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
    }
  );
};

export type UseUpdatePolicy = {
  policyId: string;
  onSuccess?: () => void;
};

export const useUpdatePolicy = ({
  policyId,
  onSuccess,
}: UseUpdatePolicy) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updatePolicy({ policyId, data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        policyManagementQueryKeys.policy.detail(policyId),
      ]);
      await queryClient.invalidateQueries([
        policyManagementQueryKeys.policy.customizeTemplate(
          policyId
        ),
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
