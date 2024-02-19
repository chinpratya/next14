import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { DataLifecycleResponseSchema } from '../schemas';
import { DataLifecycleResponse } from '../types';

export const listDataLifecycle = async (
  params: Request
): Promise<DataLifecycleResponse> => {
  const response = await apiClient.get(
    `/data-life-cycle`,
    {
      params,
      baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
    }
  );

  return DataLifecycleResponseSchema.parse(response);
};

export const useListDataLifecycle = (params: Request) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dataLifecycle.all,
        params,
      ],
      queryFn: () => listDataLifecycle(params),
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
