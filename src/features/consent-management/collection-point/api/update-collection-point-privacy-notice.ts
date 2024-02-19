import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateCollectionPointPrivacyNotice = (
  collectionPointId: string,
  data: Record<string, unknown>
): Promise<void> =>
  apiClient.put(
    `/collectionpoint/privacynotice/${collectionPointId}`,
    data,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

export type UseUpdateCollectionPointPrivacyNotice = {
  collectionPointId: string;
  onSuccess?: () => void;
};

export const useUpdateCollectionPointPrivacyNotice = ({
  collectionPointId,
  onSuccess,
}: UseUpdateCollectionPointPrivacyNotice) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateCollectionPointPrivacyNotice(
        collectionPointId,
        data
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        consentManagementQueryKeys.collectionPoint.setting(
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
