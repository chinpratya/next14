import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';

import { ReportHostEventTrafficResponseSchema } from '../schemas';
import {
  ReportHostEventTraffic,
  ReportPayload,
} from '../types';

export const listHostEventTraffic = async (
  payload: ReportPayload
): Promise<ReportHostEventTraffic[]> => {
  const { data } = await apiClient.post(
    `/core/report`,
    payload,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );

  return ReportHostEventTrafficResponseSchema.parse(data);
};

export const useListHostEventTraffic = (
  payload: ReportPayload
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [coreQueryKeys.report.all, payload],
      queryFn: () => listHostEventTraffic(payload),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
