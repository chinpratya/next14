import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { DataMappingTagsResponseSchema } from '../schemas';
import { DataMappingTagsResponse } from '../types';

export const listTags = async (
  params: Request
): Promise<DataMappingTagsResponse> => {
  const response = await apiClient.get(`/tag`, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    params,
  });

  return DataMappingTagsResponseSchema.parse(response);
};

export const useListTags = (params: Request) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [dataMappingQueryKeys.tags.all, params],
      queryFn: () => listTags(params),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
