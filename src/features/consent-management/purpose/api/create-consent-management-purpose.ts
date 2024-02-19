import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type CreateConsentManagementPurpose = {
  payload: Record<string, unknown>;
};

export const createConsentManagementPurpose = ({
  payload,
}: CreateConsentManagementPurpose): Promise<void> =>
  apiClient.post(`/purpose`, payload, {
    baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
  });

export type UseCreateConsentManagementPurpose = {
  onSuccess?: () => void;
};

export const useCreateConsentManagementPurpose = ({
  onSuccess,
}: UseCreateConsentManagementPurpose) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      createConsentManagementPurpose({ payload }),
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
