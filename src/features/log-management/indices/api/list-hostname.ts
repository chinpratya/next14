import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';
import { Request } from '@/types';

import { MonitorResponseSchema } from '../schemas';
import { MonitorResponse } from '../types';

type ListHostname = Request & {
  indices: string;
  module: 'LM' | 'SIEM';
  page_size?: number;
  response_type?: string;
};

export const listHostname = async (
  params: ListHostname
): Promise<MonitorResponse> => {
  const response = await apiClient.get(`/log/hostname`, {
    params,
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
  return MonitorResponseSchema.parse(response);
};

export type UseListHostname = ListHostname & {
  enabled?: boolean;
};

export const useListHostname = ({
  enabled = true,
  ...params
}: UseListHostname) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listHostname(params),
      queryKey: [logQueryKeys.hostname.host, params],
      keepPreviousData: true,
    });
  enabled;

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
