import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys/core';

import { OverviewListSchema } from '../schemas';
import { OverviewTableList } from '../types';

export const listOverview =
  async (): Promise<OverviewTableList> => {
    const { data } = await apiClient.get(
      `/core/report/tables/dashboard?module=SIEM`,
      { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
    );
    return OverviewListSchema.parse(data);
  };

export const useListOverview = () => {
  const {
    data,
    isFetching,
    isFetched,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => listOverview(),
    queryKey: [coreQueryKeys.reportTablesDashboard.all],
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
    refetch,
  };
};
