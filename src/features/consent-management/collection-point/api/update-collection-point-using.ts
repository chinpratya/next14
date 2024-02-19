import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateCollectionPointUsing = (
  collectionPointId: string,
  isUsing: boolean
): Promise<void> =>
  apiClient.put(
    `/collectionpoint/using/${collectionPointId}`,
    { isUsing },
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

export type UseUpdateCollectionPointUsing = {
  collectionPointId: string;
  onSuccess?: () => void;
};

export const useUpdateCollectionPointUsing = ({
  collectionPointId,
  onSuccess,
}: UseUpdateCollectionPointUsing) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (isUsing: boolean) =>
      updateCollectionPointUsing(
        collectionPointId,
        isUsing
      ),
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
