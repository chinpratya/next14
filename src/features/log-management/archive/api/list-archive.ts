import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';

import { ArchiveResponseSchema } from '../schemas';
import { ArchiveResponse } from '../types';

type Params = {
  search?: string;
  page: number;
  pageSize: number;
};

export const listArchive = async (
  params: Params
): Promise<ArchiveResponse> => {
  const data = await apiClient.get(`/log/archive`, {
    params,
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
  return ArchiveResponseSchema.parse(data);
};

export const useListArchive = (params: Params) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listArchive(params),
      queryKey: [logQueryKeys.archive.all, params],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
