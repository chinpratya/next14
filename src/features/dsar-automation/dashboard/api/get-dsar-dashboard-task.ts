import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';

import { DashboardTaskSchema } from '../schemas';
import { DashboardTask } from '../types';

export type GetDsarDashboardTask = Record<
  string,
  unknown
>;

export const getDsarDashboardTask = async ({
  ...params
}: GetDsarDashboardTask = {}): Promise<
  DashboardTask[]
> => {
  const { data } = await apiClient.get(
    `/dashboard/work`,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
      params,
    }
  );

  return z.array(DashboardTaskSchema).parse(data);
};

export const useGetDsarDashboardTask = ({
  ...params
}: GetDsarDashboardTask = {}) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryKey: [
        dsarAutomationQueryKeys.dashboard.task,
        params,
      ],
      queryFn: () => getDsarDashboardTask({ ...params }),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
