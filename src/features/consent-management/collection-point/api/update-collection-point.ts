import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateCollectionPoint = (
  collectionPointId: string,
  data: Record<string, unknown>
): Promise<void> =>
  apiClient.put(
    `/collectionpoint/${collectionPointId}`,
    data,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

export type UseUpdateCollectionPoint = {
  collectionPointId: string;
  onSuccess?: () => void;
};

export const useUpdateCollectionPoint = ({
  collectionPointId,
  onSuccess,
}: UseUpdateCollectionPoint) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateCollectionPoint(collectionPointId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        consentManagementQueryKeys.collectionPoint.detail(
          collectionPointId
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
