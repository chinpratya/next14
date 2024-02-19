import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { DataCategorySchema } from '../schemas';
import { DataCategory } from '../types';

export const getDataCategories = async (
  dataCategoriesId: string
): Promise<DataCategory> => {
  const response = await apiClient.get(
    `/data-category/${dataCategoriesId}`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return DataCategorySchema.parse(response.data);
};

export const useGetDataCategories = (
  dataCategoriesId: string
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dataCategories.detail(
          dataCategoriesId
        ),
      ],
      queryFn: () => getDataCategories(dataCategoriesId),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
