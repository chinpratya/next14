import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';

export const reCollectionPointConsent = async (
  collectionPointId: string
) =>
  apiClient.put(
    `/collectionpoint/reconsent/${collectionPointId}`,
    {},
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

export type UseReCollectionPointConsent = {
  onSuccess?: () => void;
};

export const useReCollectionPointConsent = ({
  onSuccess,
}: UseReCollectionPointConsent = {}) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (collectionPointId: string) =>
      reCollectionPointConsent(collectionPointId),
    onSuccess: () => {
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
