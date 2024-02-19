import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

import { ConsentCollectionPointLanguageDetailSchema } from '../schemas';
import { ConsentCollectionPointLanguageDetail } from '../types';

export const getCollectionPointLanguage = async (
  collectionPointId: string,
  languageId: string
): Promise<ConsentCollectionPointLanguageDetail> => {
  const response = await apiClient.get(
    `/collectionpoint/preview/${collectionPointId}/language/${languageId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return ConsentCollectionPointLanguageDetailSchema.parse(
    response.data
  );
};

export type UseGetCollectionPointLanguage = {
  collectionPointId: string;
  languageId: string;
};

export const useGetCollectionPointLanguage = ({
  collectionPointId,
  languageId,
}: UseGetCollectionPointLanguage) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.collectionPoint.language(
          collectionPointId,
          languageId
        ),
      ],
      queryFn: () =>
        getCollectionPointLanguage(
          collectionPointId,
          languageId
        ),
      enabled: !!collectionPointId && !!languageId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
