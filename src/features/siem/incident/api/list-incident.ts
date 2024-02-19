import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { siemQueryKeys } from '@/lib/queryKeys/siem';
import { queryString } from '@/utils';

import { IncidentResponseSchema } from '../schemas';
import { IncidentResponse } from '../types';

export const listIncident = async (
  search: string,
  page: number,
  pageSize: number,
  filter: Record<string, unknown>
): Promise<IncidentResponse> => {
  const params = queryString.sample({
    ...filter,
    search,
    page,
    page_size: pageSize,
  });

  const response = await apiClient.get(`/siem/incident`, {
    params,
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });

  return IncidentResponseSchema.parse(response);
};

export type UseListIncident = {
  search?: string;
  page: number;
  pageSize: number;
  filter: Record<string, unknown>;
};

export const useListIncident = ({
  search = '',
  page,
  pageSize,
  filter,
}: UseListIncident) => {
  const {
    data,
    isFetching,
    isFetched,
    isError,
    isRefetching,
    refetch,
  } = useQuery({
    queryFn: () =>
      listIncident(search, page, pageSize, filter),
    queryKey: [
      siemQueryKeys.incident.all(
        search,
        page,
        pageSize,
        filter
      ),
    ],
    keepPreviousData: true,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
    isRefetching,
    refetch,
  };
};
