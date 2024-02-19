import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { ConsentCollectionPointMetaSchema } from '../schemas';
import { ConsentCollectionPointMeta } from '../types';

export const getCollectionPointMeta =
  async (): Promise<ConsentCollectionPointMeta> => {
    const response = await apiClient.get(
      `/meta/collectionpoint`,
      {
        baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
      }
    );

    return ConsentCollectionPointMetaSchema.parse(
      response.data
    );
  };

export const useGetCollectionPointMeta = () => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.collectionPoint.meta,
      ],
      queryFn: () => getCollectionPointMeta(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
