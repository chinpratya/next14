import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';

import {
  ReportChartSchema,
  ReportOverviewSchema,
  ReportResponseSchema,
  ReportTableSchema,
} from '../schemas';
import {
  ReportChart,
  ReportOverview,
  ReportPayload,
  ReportResponse,
  ReportTable,
} from '../types';

export const getReport = async (
  payload: ReportPayload
): Promise<
  | ReportResponse
  | ReportTable
  | ReportOverview
  | ReportChart
> => {
  const { data } = await apiClient.post(
    `/core/report`,
    payload,
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );

  const { filter, report_type } = payload;

  if (filter.type === 'archive') {
    return ReportTableSchema.parse(data);
  } else if (report_type === 'organization') {
    return ReportOverviewSchema.parse(data);
  } else if (
    report_type === 'lists' &&
    filter.type === 'event'
  ) {
    return ReportChartSchema.parse(data);
  }

  return ReportResponseSchema.parse(data);
};

export const useGetReport = (payload: ReportPayload) => {
  const {
    data,
    isFetched,
    isFetching,
    isError,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: [coreQueryKeys.report.all, payload],
    queryFn: () => getReport(payload),
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
    isRefetching,
    refetch,
  };
};
