import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteCollectionPoint = (
  collectionPointId: string
): Promise<void> =>
  apiClient.delete(
    `/collectionpoint/element/${collectionPointId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

export type UseDeleteActivity = {
  onSuccess?: () => void;
};

export const useDeleteCollectionPoint = ({
  onSuccess,
}: UseDeleteActivity = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteCollectionPoint,
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
