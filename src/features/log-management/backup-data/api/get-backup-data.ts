import { useQuery } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';

import { BackupDataInfoSchema } from '../schemas';
import { BackupDataInfo } from '../types';

export const getBackupData = async (
  backupDataId: string
): Promise<BackupDataInfo> => {
  const { data } = await apiClient.get(
    `/log/backup/${backupDataId}`,
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
  return BackupDataInfoSchema.parse(data);
};

type UseGetBackupData = {
  backupDataId: string;
};

export const useGetBackupData = ({
  backupDataId,
}: UseGetBackupData) => {
  const { data, isFetching, isFetched, isError } =
    useQuery({
      queryFn: () => getBackupData(backupDataId),
      queryKey: [
        logQueryKeys.backup.detail(backupDataId),
      ],
      keepPreviousData: true,
      enabled: !!backupDataId,
    });

  return {
    data,
    isLoading: isFetching && !isFetched,
    isError,
  };
};
