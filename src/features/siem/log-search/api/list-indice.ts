import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';
import { Request } from '@/types';

import { LogSearchIndiceResponseSchema } from '../schemas';
import { LogSearchIndiceResponse } from '../types';

type ListLogSearchIndice = Request & {
  page_size?: number;
};

export const listLogSearchIndice = async (
  params: ListLogSearchIndice
): Promise<LogSearchIndiceResponse> => {
  const response = await apiClient.get(
    `/log/search/indices?module=SIEM&response_type=lists`,
    {
      params,
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
  return LogSearchIndiceResponseSchema.parse(response);
};

type UseListLogSearchIndice = ListLogSearchIndice;

export const useListLogSearchIndice = (
  params: UseListLogSearchIndice
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listLogSearchIndice(params),
      queryKey: [
        logQueryKeys.searchIndices.all('SIEM'),
        params,
      ],
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
