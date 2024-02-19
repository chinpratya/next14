import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { ConsentCollectionPointDetailSchema } from '../schemas';
import { ConsentCollectionPointDetail } from '../types';

export const getCollectionPoint = async (
  collectionPointId: string
): Promise<ConsentCollectionPointDetail> => {
  const response = await apiClient.get(
    `/collectionpoint/${collectionPointId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return ConsentCollectionPointDetailSchema.parse(
    response.data
  );
};

export const useGetCollectionPoint = (
  collectionPointId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.collectionPoint.detail(
          collectionPointId
        ),
      ],
      queryFn: () =>
        getCollectionPoint(collectionPointId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
