import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createCollectionPoint = (
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(`/collectionpoint`, data, {
    baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
  });
};

export type UseCreateCollectionPoint = {
  onSuccess?: () => void;
};

export const useCreateCollectionPoint = ({
  onSuccess,
}: UseCreateCollectionPoint) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: createCollectionPoint,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        consentManagementQueryKeys.collectionPoint.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
