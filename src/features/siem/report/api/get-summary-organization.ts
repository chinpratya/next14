import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';

import { EventSummaryOrganizationSchema } from '../schemas';
import {
  EventSummaryOrganization,
  ReportPayload,
} from '../types';

export const getSummaryOrganization = async (
  payload: ReportPayload
): Promise<EventSummaryOrganization> => {
  const { data } = await apiClient.post(
    `/core/report`,
    payload,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );
  return EventSummaryOrganizationSchema.parse(data);
};

export const useGetSummaryOrganization = (
  payload: ReportPayload
) => {
  const { data, isFetched, isFetching, isError } =
    useQuery({
      queryKey: [coreQueryKeys.report.all, payload],
      queryFn: () => getSummaryOrganization(payload),
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
