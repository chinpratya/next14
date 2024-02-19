import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateConsentManagementPurpose = async (
  purposeId: string,
  data: Record<string, unknown>
): Promise<void> => {
  return await apiClient.put(
    `/purpose/${purposeId}`,
    data,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );
};

export type UseUpdateConsentManagementPurpose = {
  purposeId: string;
  onSuccess?: () => void;
};
export const useUpdateConsentManagementPurpose = ({
  purposeId,
  onSuccess,
}: UseUpdateConsentManagementPurpose) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateConsentManagementPurpose(purposeId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        consentManagementQueryKeys.purpose.detail(
          purposeId
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
