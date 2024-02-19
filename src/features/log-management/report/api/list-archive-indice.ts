import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';

import { ReportArchiveIndiceSchema } from '../schemas';
import {
  ReportArchiveIndice,
  ReportPayload,
} from '../types';

export const listArchiveIndice = async (
  payload: ReportPayload
): Promise<ReportArchiveIndice> => {
  const { data } = await apiClient.post(
    `/core/report`,
    payload,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );

  return ReportArchiveIndiceSchema.parse(data);
};

export const useListArchiveIndice = (
  payload: ReportPayload
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [coreQueryKeys.report.all, payload],
      queryFn: () => listArchiveIndice(payload),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
