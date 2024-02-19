import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { logQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createLogDownload = (
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(`/log/download`, data, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

type UseCreateLogDownload = {
  onSuccess?: () => void;
};

export const useCreateLogDownload = ({
  onSuccess,
}: UseCreateLogDownload) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: createLogDownload,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        logQueryKeys.download.all,
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
