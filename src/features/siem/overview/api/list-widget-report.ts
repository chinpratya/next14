import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys/core';

import { ReportWidgetSchema } from '../schemas';
import { WidgetReport } from '../types';

export const listWidgetReport =
  async (): Promise<WidgetReport> => {
    const { data } = await apiClient.get(
      `/core/report/widgets/dashboard?module=SIEM`,
      { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
    );
    return ReportWidgetSchema.parse(data);
  };

export const useListWidgetReport = () => {
  const {
    data,
    isFetching,
    isFetched,
    isError,
    isRefetching,
    refetch,
  } = useQuery({
    queryFn: () => listWidgetReport(),
    queryKey: [coreQueryKeys.reportWidgetsDashboard.all],
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
    isRefetching,
    refetch,
  };
};
