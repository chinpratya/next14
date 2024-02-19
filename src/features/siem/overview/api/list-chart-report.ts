import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys/core';

import { ReportChartSchema } from '../schemas';
import { ChartReport } from '../types';

export const listChartReport =
  async (): Promise<ChartReport> => {
    const { data } = await apiClient.get(
      `/core/report/charts/dashboard?module=SIEM`,
      { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
    );
    return ReportChartSchema.parse(data);
  };

export const useListChartReport = () => {
  const {
    data,
    isFetching,
    isFetched,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => listChartReport(),
    queryKey: [coreQueryKeys.reportChartsDashboard.all],
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
    refetch,
  };
};
