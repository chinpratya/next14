import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys/log';
import { queryClient } from '@/lib/react-query';

export const deleteBackupData = async (
  backupDataId: string
): Promise<void> => {
  return apiClient.delete(`/log/backup/${backupDataId}`, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

export type UseDeleteBackupData = {
  onSuccess?: () => void;
};

export const useDeleteBackupData = ({
  onSuccess,
}: UseDeleteBackupData) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteBackupData,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        logQueryKeys.backup.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
    isError,
  };
};
