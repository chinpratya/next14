import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';

import { LastlogReceiveResponseSchema } from '../schemas';
import {
  LastlogReceiveResponse,
  ReportPayload,
} from '../types';

export const listLastlogReceive = async (
  payload: ReportPayload
): Promise<LastlogReceiveResponse> => {
  const { data } = await apiClient.post(
    `/core/report`,
    payload,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );

  return LastlogReceiveResponseSchema.parse(data);
};

export const useListLastlogReceive = (
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
    queryFn: () => listLastlogReceive(payload),
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
    isRefetching,
    refetch,
  };
};
