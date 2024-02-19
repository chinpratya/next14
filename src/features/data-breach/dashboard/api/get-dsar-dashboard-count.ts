import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';

import { DashboardCountSchema } from '../schemas';
import { DashboardCount } from '../types';

export type GetDsarDashboardCount = Record<
  string,
  unknown
>;

export const getDsarDashboardCount = async ({
  ...params
}: GetDsarDashboardCount = {}): Promise<DashboardCount> => {
  const { data } = await apiClient.get(
    `/dashboard/count`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
      params,
    }
  );

  return DashboardCountSchema.parse(data);
};

export const useGetDsarDashboardCount = ({
  ...params
}: GetDsarDashboardCount = {}) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dataBreachQueryKeys.dashboard.count,
        params,
      ],
      queryFn: () => getDsarDashboardCount({ ...params }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
