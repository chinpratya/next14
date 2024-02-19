import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { incidentManagementQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { TagResponseSchema } from '../schemas';
import { TagResponse } from '../types';

export type ListTags = Request;

export const listTags = async ({
  ...params
}: ListTags): Promise<TagResponse> => {
  const response = await apiClient.get('/tag', {
    params,
    baseURL: API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL,
  });

  return TagResponseSchema.parse(response?.data);
};

export const useListTags = (params: ListTags) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        incidentManagementQueryKeys.tags.all,
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
