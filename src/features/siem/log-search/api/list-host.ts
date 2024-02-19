import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';

import { LogSearchHostResponseSchema } from '../schemas';
import { LogSearchHostResponse } from '../types';

export const listLogSearchHost = async (
  indices: string
): Promise<LogSearchHostResponse> => {
  const response = await apiClient.get(
    `/log/search/hosts?indices=${indices}&module=SIEM&response_type=lists`,
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
  return LogSearchHostResponseSchema.parse(response);
};

export const useListLogSearchHost = (indices: string) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listLogSearchHost(indices),
      queryKey: [
        logQueryKeys.searchHost.all(indices, 'SIEM'),
      ],
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
