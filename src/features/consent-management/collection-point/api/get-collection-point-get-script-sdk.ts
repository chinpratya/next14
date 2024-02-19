import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { consentManagementQueryKeys } from '@/lib/queryKeys';

export const getCollectionPointGetScriptSDK = async (
  collectionPointId: string
) => {
  const response = await apiClient.get(
    `/portal/sdk/demo/${collectionPointId}`,
    {
      baseURL: API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL,
    }
  );

  return response.data;
};

export const useGetCollectionPointGetScriptSDK = (
  collectionPointId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        consentManagementQueryKeys.collectionPoint.sdk(
          collectionPointId
        ),
      ],
      queryFn: () =>
        getCollectionPointGetScriptSDK(collectionPointId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
