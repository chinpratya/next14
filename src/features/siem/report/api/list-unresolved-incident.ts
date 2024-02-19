import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';

import { UnresolvedIncidentResponseSchema } from '../schemas';
import {
  ReportPayload,
  UnresolvedIncident,
} from '../types';

export const listUnresolvedIncident = async (
  payload: ReportPayload
): Promise<UnresolvedIncident[]> => {
  const { data } = await apiClient.post(
    `/core/report`,
    payload,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );

  return UnresolvedIncidentResponseSchema.parse(data);
};

export const useListUnresolvedIncident = (
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
    queryFn: () => listUnresolvedIncident(payload),
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
    isRefetching,
    refetch,
  };
};
