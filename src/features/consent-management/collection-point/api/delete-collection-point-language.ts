import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteCollectionPointLanguage = (
  collectionPointId: string,
  languageId: string
) =>
  apiClient.delete(
    `/collectionpoint/preview/${collectionPointId}/language/${languageId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

export type UseDeleteCollectionPointLanguage = {
  collectionPointId: string;
  onSuccess?: () => void;
};

export const useDeleteCollectionPointLanguage = ({
  collectionPointId,
  onSuccess,
}: UseDeleteCollectionPointLanguage) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (languageId: string) =>
      deleteCollectionPointLanguage(
        collectionPointId,
        languageId
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        consentManagementQueryKeys.collectionPoint.languages(
          collectionPointId
        ),
      ]);
      await queryClient.invalidateQueries([
        consentManagementQueryKeys.collectionPoint.language(
          collectionPointId,
          'all'
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
