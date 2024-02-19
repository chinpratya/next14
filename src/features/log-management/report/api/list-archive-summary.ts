import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';

import { OptionResponseSchema } from '../schemas';
import { Option, ReportPayload } from '../types';

export const listArchiveSummary = async (
  payload: ReportPayload
): Promise<Option[]> => {
  const { data } = await apiClient.post(
    `/core/report`,
    payload,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );

  return OptionResponseSchema.parse(data);
};

export const useListArchiveSummary = (
  payload: ReportPayload
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [coreQueryKeys.report.all, payload],
      queryFn: () => listArchiveSummary(payload),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
