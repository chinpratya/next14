import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { TotalCountSchema } from '../schemas';
import { TotalCount } from '../types';

export const getDashboardCount =
  async (): Promise<TotalCount> => {
    const { data } = await apiClient.get(
      `/dashboard/count`,
      {
        baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      }
    );

    return TotalCountSchema.parse(data);
  };

export const useGetDashboardCount = () => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [dataMappingQueryKeys.dashbaord.count],
      queryFn: () => getDashboardCount(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
