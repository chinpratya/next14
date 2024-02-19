import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';
import { Request } from '@/types';

import { BackupDataResponseSchema } from '../schemas';
import { BackupDataResponse } from '../types';

type ListBackupData = Request;

export const listBackupData = async (
  params: ListBackupData
): Promise<BackupDataResponse> => {
  const data = await apiClient.get(`/log/backup`, {
    params,
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
  return BackupDataResponseSchema.parse(data);
};

type UseListBackupData = ListBackupData & {
  page_size?: number;
};

export const useListBackupData = (
  params: UseListBackupData
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listBackupData(params),
      queryKey: [logQueryKeys.backup.all, params],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
