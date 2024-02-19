import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

export const getWebformEventTemplate =
  async (): Promise<string> => {
    const response = await apiClient.get(
      '/webfrom/templateevent',
      {
        baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
      }
    );

    return z.string().parse(response);
  };

export const useGetWebformEventTemplate = () => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => getWebformEventTemplate(),
      queryKey: [
        dataBreachQueryKeys.webform.eventTemplate,
      ],
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
