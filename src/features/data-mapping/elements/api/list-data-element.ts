import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { DataElementResponseSchema } from '../schemas';
import { DataElementResponse } from '../types';

type ListDataElement = Request;

export const listDataElement = async (
  params: ListDataElement
): Promise<DataElementResponse> => {
  const response = await apiClient.get(`/data-element`, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    params,
  });
  return DataElementResponseSchema.parse(response);
};

type UseListDataElement = ListDataElement;

export const useListDataElement = (
  params: UseListDataElement
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listDataElement(params),
      queryKey: [
        dataMappingQueryKeys.dataElement.all,
        params,
      ],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
