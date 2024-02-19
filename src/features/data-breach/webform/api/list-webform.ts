import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { WebFormResponseSchema } from '../schemas';
import { WebFormResponse } from '../types';

export const listWebform = async (
  params: Request
): Promise<WebFormResponse> => {
  const response = await apiClient.get(`/webfrom`, {
    baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    params,
  });

  return WebFormResponseSchema.parse(response);
};

export const useListWebform = (params: Request) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [dataBreachQueryKeys.webform.all, params],
      queryFn: () => listWebform(params),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
