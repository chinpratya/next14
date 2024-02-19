import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';

import { ReportOverviewSchema } from '../schemas';
import { ReportOverview, ReportPayload } from '../types';

export const getReportIndex = async (
  payload: ReportPayload
): Promise<ReportOverview> => {
  const { data } = await apiClient.post(
    `/core/report`,
    payload,
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );

  return ReportOverviewSchema.parse(data);
};

export const useGetReportIndex = (
  payload: ReportPayload
) => {
  const {
    data,
    isFetched,
    isFetching,
    isError,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: [coreQueryKeys.report.all, payload],
    queryFn: () => getReportIndex(payload),
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
    isRefetching,
    refetch,
  };
};
