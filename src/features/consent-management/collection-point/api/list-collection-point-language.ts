import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { ConsentCollectionPointLanguageSchema } from '../schemas';
import { ConsentCollectionPointLanguage } from '../types';

export const listCollectionPointLanguage = async (
  collectionPointId: string
): Promise<ConsentCollectionPointLanguage[]> => {
  const response = await apiClient.get(
    `/collectionpoint/preview/${collectionPointId}/language`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return z
    .array(ConsentCollectionPointLanguageSchema)
    .parse(response.data);
};

export const useListCollectionPointLanguage = (
  collectionPointId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.collectionPoint.languages(
          collectionPointId
        ),
      ],
      queryFn: () =>
        listCollectionPointLanguage(collectionPointId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
