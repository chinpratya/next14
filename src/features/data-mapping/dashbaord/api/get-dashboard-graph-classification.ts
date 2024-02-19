import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { DashboardGraphSchema } from '../schemas';
import { DashboardGraph } from '../types';

export const getDashboardGraphClassification =
  async (): Promise<DashboardGraph[]> => {
    const { data } = await apiClient.get(
      `/dashboard/graph/classification`,
      {
        baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      }
    );

    return z.array(DashboardGraphSchema).parse(data);
  };

export const useGetDashboardGraphClassification = () => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dashbaord.classification,
      ],
      queryFn: () => getDashboardGraphClassification(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
