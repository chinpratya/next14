import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';

import { LogSearchHostResponseSchema } from '../schemas';
import { LogSearchHostResponse } from '../types';

type ListLogSearchHost = {
  type: string;
  value: string;
  module: 'LM' | 'SIEM';
  response_type: string;
};

export const listLogSearchHost = async (
  params: ListLogSearchHost
): Promise<LogSearchHostResponse> => {
  const response = await apiClient.get(
    `/log/search/hosts`,
    {
      params,
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
  return LogSearchHostResponseSchema.parse(response);
};

type UseListLogSearchHost = ListLogSearchHost & {
  enabled?: boolean;
};

export const useListLogSearchHost = ({
  enabled = true,
  ...params
}: UseListLogSearchHost) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listLogSearchHost(params),
      queryKey: [
        logQueryKeys.searchHost.all(
          params.value,
          params.module
        ),
        params,
      ],
      enabled,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
