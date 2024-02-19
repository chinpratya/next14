import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type AddCollectionPointLanguage = {
  collectionPointId: string;
  languageId: string;
};

export const addCollectionPointLanguage = ({
  collectionPointId,
  languageId,
}: AddCollectionPointLanguage): Promise<void> =>
  apiClient.put(
    `/collectionpoint/preview/${collectionPointId}/language`,
    {
      languageID: languageId,
    },
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

export type UseAddCollectionPointLanguage = {
  collectionPointId: string;
  onSuccess?: () => void;
};

export const useAddCollectionPointLanguage = ({
  collectionPointId,
  onSuccess,
}: UseAddCollectionPointLanguage) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (languageId: string) =>
      addCollectionPointLanguage({
        collectionPointId,
        languageId,
      }),
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
      await queryClient.invalidateQueries([
        consentManagementQueryKeys.collectionPoint.preview(
          collectionPointId
        ),
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
