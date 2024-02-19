import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { policyManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deletePolicyLanguage = (
  policyId: string,
  languageId: string
) =>
  apiClient.delete(
    `/policyNotices/${policyId}/language/${languageId}`,
    {
      baseURL:
        API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL,
    }
  );

export type UseDeletePolicyLanguage = {
  policyId: string;
  onSuccess?: () => void;
};

export const useDeletePolicyLanguage = ({
  policyId,
  onSuccess,
}: UseDeletePolicyLanguage) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (languageId: string) =>
      deletePolicyLanguage(policyId, languageId),
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
