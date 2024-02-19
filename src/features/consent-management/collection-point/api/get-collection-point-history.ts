import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ConsentCollectionPointHistoryResponseSchema } from '../schemas';
import { ConsentCollectionPointHistoryResponse } from '../types';

export type GetCollectionPointHistory = Request & {
  collectionPiontId: string;
};
export const getCollectionPointHistory = async ({
  collectionPiontId,
  ...params
}: GetCollectionPointHistory): Promise<ConsentCollectionPointHistoryResponse> => {
  const response = await apiClient.get(
    `/historycollectionpoint/${collectionPiontId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
      params,
    }
  );

  return ConsentCollectionPointHistoryResponseSchema.parse(
    response
  );
};

export type UseGetCollectionPointHistory = Request & {
  collectionPiontId: string;
};

export const useGetCollectionPointHistory = ({
  collectionPiontId,
  ...params
}: UseGetCollectionPointHistory) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.collectionPoint.history(
          collectionPiontId
        ),
        params,
      ],
      queryFn: () =>
        getCollectionPointHistory({
          collectionPiontId,
          ...params,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
