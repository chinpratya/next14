import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { ConsentCollectionPointElementSchema } from '../schemas';
import { ConsentCollectionPointElement } from '../types';

export const getCollectionPointElement = async (
  collectionPointId: string
): Promise<ConsentCollectionPointElement> => {
  const response = await apiClient.get(
    `/collectionpoint/element/${collectionPointId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return ConsentCollectionPointElementSchema.parse(
    response.data
  );
};

export const useGetCollectionPointElement = (
  collectionPointId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.collectionPoint.element(
          collectionPointId
        ),
      ],
      queryFn: () =>
        getCollectionPointElement(collectionPointId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
