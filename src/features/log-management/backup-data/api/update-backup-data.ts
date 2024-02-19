import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateBackupDataProps = {
  backupDataId: string;
  data: Record<string, unknown>;
};

export const updateBackupData = ({
  backupDataId,
  data,
}: UpdateBackupDataProps): Promise<void> => {
  return apiClient.put(
    `/log/backup/${backupDataId}`,
    data,
    {
      baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
    }
  );
};

type UseUpdateBackupData = {
  backupDataId: string;
  onSuccess?: () => void;
};

export const useUpdateBackupData = ({
  backupDataId,
  onSuccess,
}: UseUpdateBackupData) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateBackupData({ data, backupDataId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        logQueryKeys.backup.all,
      ]),
        onSuccess?.();
    },
  });
  return { submit, isLoading };
};
