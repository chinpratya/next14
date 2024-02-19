import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';

import { EventSummaryListSchema } from '../schemas';
import {
  EventSummaryList,
  ReportPayload,
} from '../types';

export const listEventSummary = async (
  payload: ReportPayload
): Promise<EventSummaryList> => {
  const { data } = await apiClient.post(
    `/core/report`,
    payload,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );

  return EventSummaryListSchema.parse(data);
};

export const useListEventSummary = (
  payload: ReportPayload
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [coreQueryKeys.report.all, payload],
      queryFn: () => listEventSummary(payload),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
