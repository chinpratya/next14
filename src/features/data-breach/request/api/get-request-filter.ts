import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { MetaSchema } from '@/schema/meta';
import { Meta } from '@/types/meta';

export const getRequestFilter = async (): Promise<
  Record<string, Meta[]>
> => {
  const response = await apiClient.get(
    '/request/filter',
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

  return z
    .record(z.array(MetaSchema))
    .parse(response.data);
};

export const useGetRequestFilter = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [dataBreachQueryKeys.request.filter],
      queryFn: getRequestFilter,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
