import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';

import { LogSearchResponseSchema } from '../schemas';
import { LogSearchResponse } from '../types';

export const listLogSearch = async (
  data: Record<string, unknown>
): Promise<LogSearchResponse> => {
  const response = await apiClient.post(
    `/log/search`,
    data,
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
  return LogSearchResponseSchema.parse(response);
};

type UseListLogSearch = {
  payload: Record<string, unknown>;
  enabled?: boolean;
  onSuccess?: () => void;
};

export const useListLogSearch = ({
  payload,
  enabled = true,
  onSuccess,
}: UseListLogSearch) => {
  const {
    data,
    isFetching,
    isFetched,
    isError,
    isRefetching,
    refetch,
  } = useQuery({
    queryFn: () => listLogSearch(payload),
    queryKey: [logQueryKeys.searchList.all, payload],
    keepPreviousData: true,
    enabled,
    onSuccess,
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
    isRefetching,
    refetch,
  };
};
