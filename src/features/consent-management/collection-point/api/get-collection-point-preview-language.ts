import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import {
  ConsentBuilderFormLanguageSchema,
  ConsentBuilderFormLanguageType,
} from '@/stores/consent-builder';

export const getCollectionPointPreviewLanguage = async (
  collectionPointId: string
): Promise<ConsentBuilderFormLanguageType> => {
  const response = await apiClient.get(
    `/collectionpoint/preview/${collectionPointId}/formlanguage`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return ConsentBuilderFormLanguageSchema.parse(
    response.data
  );
};

export const useGetCollectionPointPreviewLanguage = (
  collectionPointId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.collectionPoint.preview(
          collectionPointId
        ),
        consentManagementQueryKeys.collectionPoint.all,
      ],
      queryFn: () =>
        getCollectionPointPreviewLanguage(
          collectionPointId
        ),
      enabled: !!collectionPointId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
