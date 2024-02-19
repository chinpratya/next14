import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';
import { queryString } from '@/utils';

import { DirectoryResponseSchema } from '../schemas';
import { DirectoryResponse } from '../types';

type Params = {
  path: string;
  level: string;
  page?: number;
  page_size?: number;
};

export const listDirectory = async (
  payload: Params
): Promise<DirectoryResponse> => {
  const params = queryString.sample({
    ...payload,
    page: payload.page ?? 1,
    page_size: payload.page_size ?? 100,
  });
  const data = await apiClient.get(`/log/directory`, {
    params,
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
  return DirectoryResponseSchema.parse(data);
};

type UseListDirectory = {
  params: Params;
  enabled?: boolean;
};

export const useListDirectory = ({
  params,
  enabled = true,
}: UseListDirectory) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listDirectory(params),
      queryKey: [
        logQueryKeys.directory.all(params.path),
        params,
      ],
      enabled: enabled,
      keepPreviousData:
        params.level === 'file' ? true : false,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
