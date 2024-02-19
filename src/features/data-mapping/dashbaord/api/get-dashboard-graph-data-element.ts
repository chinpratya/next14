import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_DATA_MAPPING_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataMappingQueryKeys } from '@/lib/queryKeys';

import { DashboardGraphSchema } from '../schemas';
import { DashboardGraph } from '../types';

export const getDashboardGraphDataElement =
  async (): Promise<DashboardGraph[]> => {
    const { data } = await apiClient.get(
      `/dashboard/graph/data-element`,
      {
        baseURL: API_ENDPOINT_DATA_MAPPING_BASE_URL,
      }
    );

    return z.array(DashboardGraphSchema).parse(data);
  };

export const useGetDashboardGraphDataElement = () => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [
        dataMappingQueryKeys.dashbaord.dataElement,
      ],
      queryFn: () => getDashboardGraphDataElement(),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
