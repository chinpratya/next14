import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { RopaResponseSchema } from '../schemas';
import { RopaResponse } from '../types';

type ListRopa = Request & {
  tagID?: string;
};
export const listRopa = async (
  params: ListRopa
): Promise<RopaResponse> => {
  const response = await apiClient.get(`/ropa`, {
    baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    params,
  });

  return RopaResponseSchema.parse(response);
};

export const useListRopa = (params: ListRopa) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [dataMappingQueryKeys.ropa.all, params],
      queryFn: () => listRopa(params),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
