import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type UpdatePolicyTemplate = {
  policyId: string;
  wizardId: string;
  data: Record<string, unknown>;
};

export const updatePolicyTemplate = async ({
  policyId,
  data,
  wizardId,
}: UpdatePolicyTemplate): Promise<void> => {
  return apiClient.put(
    `/policyNotices/wizzard/${policyId}/${wizardId}`,
    data,
    {
      baseURL:
        API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
    }
  );
};

export type UseUpdatePolicyTemplate = {
  policyId: string;
  onSuccess?: () => void;
};

export const useUpdatePolicyTemplate = ({
  policyId,
  onSuccess,
}: UseUpdatePolicyTemplate) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({
      data,
      wizardId,
    }: {
      wizardId: string;
      data: Record<string, unknown>;
    }) =>
      updatePolicyTemplate({ policyId, data, wizardId }),
    onSuccess: async () => {
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
