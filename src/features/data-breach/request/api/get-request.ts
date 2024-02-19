import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { RequestDetailSchema } from '../schemas';
import { RequestDetail } from '../types';

export const getRequest = async (
  requestId: string
): Promise<RequestDetail> => {
  const { data } = await apiClient.get(
    `/request/${requestId}`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

  return RequestDetailSchema.parse(data);
};

export const useGetRequest = (requestId: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.request.detail(requestId),
      ],
      queryFn: () => getRequest(requestId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
