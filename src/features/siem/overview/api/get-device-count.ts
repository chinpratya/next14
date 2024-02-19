import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';

import { ReportPayload } from '../../report/types';
import { OverviewDeviceSchema } from '../schemas';
import { OverviewDevice } from '../types';

export const getDeviceCount = async (
  payload: ReportPayload
): Promise<OverviewDevice> => {
  const { data } = await apiClient.post(
    `/core/report`,
    payload,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );
  return OverviewDeviceSchema.parse(data);
};

export const UseGetDeviceCount = (
  payload: ReportPayload
) => {
  const {
    data,
    isFetching,
    isFetched,
    isError,
    isRefetching,
    refetch,
  } = useQuery({
    queryFn: () => getDeviceCount(payload),
    queryKey: [coreQueryKeys.report.all, payload],
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
    isRefetching,
    refetch,
  };
};
