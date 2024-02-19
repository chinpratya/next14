import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { ConsentCollectionPointResponseSchema } from '../schemas';
import { ConsentCollectionPointResponse } from '../types';

export type ListConsentManagementCollectionPoint =
  Request;

export const listConsentManagementCollectionPoint =
  async ({
    ...params
  }: ListConsentManagementCollectionPoint): Promise<ConsentCollectionPointResponse> => {
    const response = await apiClient.get(
      `/collectionpoint`,
      {
        baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
        params,
      }
    );

    return ConsentCollectionPointResponseSchema.parse(
      response
    );
  };

export type UseListConsentManagementCollectionPoint =
  ListConsentManagementCollectionPoint;

export const useListConsentManagementCollectionPoint = ({
  ...params
}: UseListConsentManagementCollectionPoint) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.collectionPoint.all,
        params,
      ],
      queryFn: () =>
        listConsentManagementCollectionPoint({
          ...params,
        }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
