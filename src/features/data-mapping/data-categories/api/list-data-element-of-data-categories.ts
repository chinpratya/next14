import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { DataElementOfCategoriesResponseSchema } from '../schemas';
import { DataElementOfCategoriesResponse } from '../types';

type ListDataElementOfDataCategories = Request & {
  dataCategoryID: string;
};

export const listDataElementOfDataCategories = async ({
  dataCategoryID,
  ...params
}: ListDataElementOfDataCategories): Promise<DataElementOfCategoriesResponse> => {
  const response = await apiClient.get(
    `/data-category/${dataCategoryID}/data-element`,
    {
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      params,
    }
  );
  return DataElementOfCategoriesResponseSchema.parse(
    response
  );
};

export const useListDataElementOfDataCategories = ({
  dataCategoryID,
  ...params
}: ListDataElementOfDataCategories) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dataCategories.dataElement(
          dataCategoryID
        ),
        {
          ...params,
        },
      ],
      queryFn: () =>
        listDataElementOfDataCategories({
          dataCategoryID,
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
