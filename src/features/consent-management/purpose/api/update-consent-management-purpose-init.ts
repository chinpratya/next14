import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateConsentManagementPurposeInit = async (
  purposeId: string,
  data: Record<string, unknown>
): Promise<void> => {
  return await apiClient.put(
    `/purpose/init/${purposeId}`,
    data,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );
};

export type UseUpdateConsentManagementPurposeInit = {
  purposeId: string;
  onSuccess?: () => void;
};
export const useUpdateConsentManagementPurposeInit = ({
  purposeId,
  onSuccess,
}: UseUpdateConsentManagementPurposeInit) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateConsentManagementPurposeInit(purposeId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        consentManagementQueryKeys.purpose.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
