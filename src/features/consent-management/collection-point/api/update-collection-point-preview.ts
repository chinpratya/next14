import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateCollectionPointPreview = (
  collectionPointId: string,
  data: Record<string, unknown>
): Promise<void> =>
  apiClient.post(
    `/collectionpoint/preview/${collectionPointId}`,
    data,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

export type UseUpdateCollectionPointPreview = {
  collectionPointId: string;
  onSuccess?: () => void;
};

export const useUpdateCollectionPointPreview = ({
  collectionPointId,
  onSuccess,
}: UseUpdateCollectionPointPreview) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateCollectionPointPreview(
        collectionPointId,
        data
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        consentManagementQueryKeys.collectionPoint.preview(
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
