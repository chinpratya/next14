import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdatePolicyLanguage = {
  policyId: string;
  languageId: string;
  data: Record<string, unknown>;
};

export const updatePolicyLanguage = async ({
  policyId,
  languageId,
  data,
}: UpdatePolicyLanguage): Promise<void> => {
  return apiClient.put(
    `/policyNotices/${policyId}/language/${languageId}`,
    data,
    {
      baseURL:
        API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
    }
  );
};

export type UseUpdatePolicyLanguage = {
  policyId: string;
  languageId: string;
  onSuccess?: () => void;
};

export const useUpdatePolicyLanguage = ({
  policyId,
  languageId,
  onSuccess,
}: UseUpdatePolicyLanguage) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updatePolicyLanguage({
        policyId,
        languageId,
        data,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        policyManagementQueryKeys.policy.languageDetail(
          policyId,
          languageId
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
