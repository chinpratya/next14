import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { DashboardByTimeSchema } from '../schemas';
import { DashboardByTime } from '../types';

export type GetDsarDashboardByTime = Record<
  string,
  unknown
>;

export const getDsarDashboardByTime = async ({
  ...params
}: GetDsarDashboardByTime = {}): Promise<
  DashboardByTime[]
> => {
  const { data } = await apiClient.get(
    `/dashboard/bytime`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
      params,
    }
  );

  return z.array(DashboardByTimeSchema).parse(data);
};

export const useGetDsarDashboardByTime = ({
  ...params
}: GetDsarDashboardByTime = {}) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.dashboard.bytime,
        params,
      ],
      queryFn: () =>
        getDsarDashboardByTime({ ...params }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
