import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';
import { Request } from '@/types';

import { BackupDataActivityResponseSchema } from '../schemas';
import { BackupDataActivityResponse } from '../types';

type ListActivity = Request & {
  backup_id?: string;
};

export const listActivity = async (
  params: ListActivity
): Promise<BackupDataActivityResponse> => {
  const response = await apiClient.get(
    `/log/backup/activity`,
    {
      params,
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
  return BackupDataActivityResponseSchema.parse(response);
};

type UseListActivity = ListActivity & {
  page_size?: number;
};

export const useListActivity = (
  params: UseListActivity
) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => listActivity(params),
      queryKey: [logQueryKeys.backup.activity, params],
      keepPreviousData: true,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
