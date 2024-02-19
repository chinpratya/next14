import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createBackupData = (
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(`/log/backup`, data, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

type UseCreateBackupData = {
  onSuccess?: () => void;
};

export const useCreateBackupData = ({
  onSuccess,
}: UseCreateBackupData) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: createBackupData,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        logQueryKeys.backup.all,
      ]),
        onSuccess?.();
    },
  });
  return { submit, isLoading };
};
