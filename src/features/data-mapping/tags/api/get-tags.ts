import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { DataMappingTagsSchema } from '../schemas';
import { DataMappingTags } from '../types';

export const getTags = async (
  tagId?: string
): Promise<DataMappingTags> => {
  const { data } = await apiClient.get(`/tag/${tagId}`, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
  });

  return DataMappingTagsSchema.parse(data);
};

export const useGetTags = (tagId?: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      enabled: !!tagId,
      queryKey: [dataMappingQueryKeys.tags.detail(tagId)],
      queryFn: () => getTags(tagId),
    });
  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
