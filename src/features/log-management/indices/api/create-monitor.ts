import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/react-query';

export const createMonitor = (
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(`/log/monitor`, data, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

type UseCreateMonitor = {
  onSuccess?: () => void;
};

export const useCreateMonitor = ({
  onSuccess,
}: UseCreateMonitor) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: createMonitor,
    onSuccess: () => {
      queryClient.invalidateQueries();
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
