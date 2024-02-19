import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createPreferenceCenters = (
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(`/preference`, data, {
    baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
  });
};

export type UseCreatePreferenceCenters = {
  onSuccess?: () => void;
};

export const useCreatePreferenceCenters = ({
  onSuccess,
}: UseCreatePreferenceCenters) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createPreferenceCenters,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        consentManagementQueryKeys.preferenceCenters.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
