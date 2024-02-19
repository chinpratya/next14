import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';

import { ExplorerDownloadResponseSchema } from '../schemas';
import { ExplorerDownload } from '../types';

export const listLogDownload = async (): Promise<
  ExplorerDownload[]
> => {
  const { data } = await apiClient.get(`/log/download`, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
  return ExplorerDownloadResponseSchema.parse(data);
};

export const useListLogDownload = () => {
  const {
    data,
    isFetching,
    isFetched,
    isError,
    isRefetching,
    refetch,
  } = useQuery({
    queryFn: () => listLogDownload(),
    queryKey: [logQueryKeys.download.all],
  });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
    isRefetching,
    refetch,
  };
};
