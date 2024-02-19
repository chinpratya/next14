import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type addPolicyLanguageProps = {
  data: Record<string, unknown>;
  policyId: string;
};
export const addPolicyLanguage = async ({
  data,
  policyId,
}: addPolicyLanguageProps): Promise<void> => {
  await apiClient.put(
    `/policyNotices/${policyId}/language`,
    data,
    {
      baseURL:
        API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
    }
  );
};

export type UseAddPolicyLanguage = {
  policyId: string;
  onSuccess?: () => void;
};

export const useAddPolicyLanguage = ({
  onSuccess,
  policyId,
}: UseAddPolicyLanguage) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      addPolicyLanguage({ data, policyId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        policyManagementQueryKeys.policy.language(
          policyId
        ),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
