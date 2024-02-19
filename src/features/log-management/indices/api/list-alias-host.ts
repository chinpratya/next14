import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';
import { Request } from '@/types';

import { MonitorResponseSchema } from '../schemas';
import { MonitorResponse } from '../types';

type ListAliasHost = Request & {
  type: string;
  value: string;
  module: 'LM' | 'SIEM';
  page_size?: number;
  response_type?: string;
};

export const listAliasHost = async (
  params: ListAliasHost
): Promise<MonitorResponse> => {
  const response = await apiClient.get(
    `/log/hostname/hosts`,
    {
      params,
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
  return MonitorResponseSchema.parse(response);
};

export type UseListAliasHost = ListAliasHost & {
  enabled?: boolean;
};

export const useListAliasHost = ({
  enabled = true,
  ...params
}: UseListAliasHost) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listAliasHost(params),
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
