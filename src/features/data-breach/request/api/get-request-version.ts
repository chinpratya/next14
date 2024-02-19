import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { RequestVersionSchema } from '../schemas';
import { RequestVersion } from '../types';

export const getRequestVersion = async (
  requestId: string
): Promise<RequestVersion> => {
  const { data } = await apiClient.get(
    `/request/${requestId}/version`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );
  return RequestVersionSchema.parse(data);
};

export const useGetRequestVersion = (
  requestId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.request.version(requestId),
      ],
      queryFn: () => getRequestVersion(requestId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
