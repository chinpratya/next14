import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';
import { ConsentFormType } from '@/types';

export type UpdateCollectionPointLanguage = {
  collectionPointId: string;
  languageId: string;
  form: ConsentFormType;
};

export const updateCollectionPointLanguage = ({
  collectionPointId,
  languageId,
  form,
}: UpdateCollectionPointLanguage): Promise<void> =>
  apiClient.put(
    `/collectionpoint/preview/${collectionPointId}/language/${languageId}`,
    {
      form,
    },
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

export type UseUpdateCollectionPointLanguage = {
  collectionPointId: string;
  languageId: string;
  onSuccess?: () => void;
};

export const useUpdateCollectionPointLanguage = ({
  collectionPointId,
  languageId,
  onSuccess,
}: UseUpdateCollectionPointLanguage) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (form: ConsentFormType) =>
      updateCollectionPointLanguage({
        collectionPointId,
        languageId,
        form,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        consentManagementQueryKeys.collectionPoint.language(
          collectionPointId,
          languageId
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
