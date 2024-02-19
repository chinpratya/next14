import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/constants';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const createScheduler = (
  data: Record<string, unknown>
): Promise<void> => {
  return apiClient.post(`/core/report_scheduler`, data, {
    baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL,
  });
};

type UseCreateScheduler = {
  onSuccess?: () => void;
};

export const useCreateScheduler = ({
  onSuccess,
}: UseCreateScheduler) => {
  const { mutate: submit, isLoading } = useMutation({
    mutationFn: createScheduler,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        coreQueryKeys.reportScheduler.all('LM'),
      ]);
      onSuccess?.();
    },
  });

  return { submit, isLoading };
};
