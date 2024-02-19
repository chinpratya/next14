import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';

import { OptionResponseSchema } from '../schemas';
import { Option, ReportPayload } from '../types';

export const listSizeSummary = async (
  payload: ReportPayload
): Promise<Option[]> => {
  const { data } = await apiClient.post(
    `/core/report`,
    payload,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );
  return OptionResponseSchema.parse(data);
};

export const useListSizeSummary = (
  payload: ReportPayload
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listSizeSummary(payload),
      queryKey: [coreQueryKeys.report.all, payload],
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
