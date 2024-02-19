import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { WebFormVersionResponseSchema } from '../schemas';
import { WebFormVersionResponse } from '../types';

export const listWebformVersion = async (
  webformId: string
): Promise<WebFormVersionResponse> => {
  const response = await apiClient.get(
    `/webfrom/${webformId}/version`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

  return WebFormVersionResponseSchema.parse(response);
};

export const useListWebformVersion = (
  webformId: string
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.webform.version(webformId),
      ],
      queryFn: () => listWebformVersion(webformId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
