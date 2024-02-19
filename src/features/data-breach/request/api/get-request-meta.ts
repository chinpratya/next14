import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { RequestMetaSchema } from '../schemas';
import { RequestMeta } from '../types';

export const getRequestMeta =
  async (): Promise<RequestMeta> => {
    const response = await apiClient.get(
      `/request/meta`,
      {
        baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
      }
    );

    return RequestMetaSchema.parse(response.data);
  };

export const useGetRequestMeta = () => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [dataBreachQueryKeys.request.meta],
      queryFn: () => getRequestMeta(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
