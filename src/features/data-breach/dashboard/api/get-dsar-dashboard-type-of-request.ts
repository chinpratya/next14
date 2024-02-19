import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { DashboardTypeOfRequestSchema } from '../schemas';
import { DashboardTypeOfRequest } from '../types';

export type GetDsarDashboardTypeOfRequest = Record<
  string,
  unknown
>;
export const getDsarDashboardTypeOfRequest = async ({
  ...params
}: GetDsarDashboardTypeOfRequest = {}): Promise<
  DashboardTypeOfRequest[]
> => {
  const { data } = await apiClient.get(
    `/dashboard/typeofrequest`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
      params,
    }
  );

  return z
    .array(DashboardTypeOfRequestSchema)
    .parse(data);
};

export const useGetDsarDashboardTypeOfRequest = ({
  ...params
}: GetDsarDashboardTypeOfRequest = {}) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.dashboard.typeofrequest,
        params,
      ],
      queryFn: () =>
        getDsarDashboardTypeOfRequest({
          ...params,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
