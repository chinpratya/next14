import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import {
  ConsentBuilderFormSchema,
  ConsentBuilderFormType,
} from '@/stores/consent-builder';

export const getCollectionPointPreview = async (
  collectionPointId: string
): Promise<ConsentBuilderFormType> => {
  const response = await apiClient.get(
    `/collectionpoint/preview/${collectionPointId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return ConsentBuilderFormSchema.parse(
    response.data?.form
  );
};

export const useGetCollectionPointPreview = (
  collectionPointId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.collectionPoint.preview(
          collectionPointId
        ),
      ],
      queryFn: () =>
        getCollectionPointPreview(collectionPointId),
      enabled: !!collectionPointId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
