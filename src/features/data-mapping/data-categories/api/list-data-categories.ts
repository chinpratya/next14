import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { DataCategoriesResponseSchema } from '../schemas';
import { DataCategoriesResponse } from '../types';

type ListDataCategories = Request & {
  status?: 'active' | 'inactive';
  tagID?: string;
};

export const listDataCategories = async ({
  ...params
}: ListDataCategories): Promise<DataCategoriesResponse> => {
  const response = await apiClient.get(`/data-category`, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    params,
  });
  return DataCategoriesResponseSchema.parse(response);
};

export const useListDataCategories = ({
  ...params
}: ListDataCategories) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dataCategories.all,
        {
          ...params,
        },
      ],
      queryFn: () =>
        listDataCategories({
          ...params,
        }),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
