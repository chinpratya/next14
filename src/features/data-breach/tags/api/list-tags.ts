import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { TagResponseSchema } from '../schemas';
import { TagResponse } from '../types';

export type ListTags = Request;

export const listTags = async ({
  ...params
}: ListTags): Promise<TagResponse> => {
  const response = await apiClient.get('/tagdsar', {
    params,
    baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
  });

  return TagResponseSchema.parse(response);
};

export const useListTags = (params: ListTags) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.tags.all,
        {
          ...params,
        },
      ],
      queryFn: () => listTags(params),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
