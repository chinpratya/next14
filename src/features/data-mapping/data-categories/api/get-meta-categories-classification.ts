import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { MetaCategoriesResponseSchema } from '../schemas';
import { MetaCategoriesResponse } from '../types';

export const getMetaCategoriesClassification =
  async (): Promise<MetaCategoriesResponse> => {
    const response = await apiClient.get(
      `/meta/data-category`,
      {
        baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      }
    );
    return MetaCategoriesResponseSchema.parse(response);
  };

export const useGetMetaCategoriesClassification = () => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dataCategories.meta,
      ],
      queryFn: () => getMetaCategoriesClassification(),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
