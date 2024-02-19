import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type addPolicyUserProps = {
  data: Record<string, unknown>;
  policyId: string;
};
export const addPolicyUser = async ({
  data,
  policyId,
}: addPolicyUserProps): Promise<void> => {
  await apiClient.post(
    `/policyNotices/${policyId}/users`,
    data,
    {
      baseURL:
        API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
    }
  );
};

export type UseAddPolicyUser = {
  policyId: string;
  onSuccess?: () => void;
};

export const useAddPolicyUser = ({
  onSuccess,
  policyId,
}: UseAddPolicyUser) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      addPolicyUser({ data, policyId }),
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
  };
};
