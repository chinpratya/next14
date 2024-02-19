import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { DashboardWebFormRequestSchema } from '../schemas';
import { DashboardWebFormRequest } from '../types';

export type GetDsarDashboardWebform = Record<
  string,
  unknown
>;

export const getDsarDashboardWebform = async ({
  ...params
}: GetDsarDashboardWebform = {}): Promise<
  DashboardWebFormRequest[]
> => {
  const { data } = await apiClient.get(
    `/dashboard/webfrom`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
      params,
    }
  );

  return z
    .array(DashboardWebFormRequestSchema)
    .parse(data);
};

export const useGetDsarDashboardWebform = ({
  ...params
}: GetDsarDashboardWebform = {}) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.dashboard.webform,
        params,
      ],
      queryFn: () =>
        getDsarDashboardWebform({
          ...params,
        }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
