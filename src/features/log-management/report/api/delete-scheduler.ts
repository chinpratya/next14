import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_CYBERFENCE_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { coreQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteScheduler = async (
  schedulerId: string
): Promise<void> => {
  return apiClient.delete(
    `/core/report_scheduler/${schedulerId}`,
    { baseURL: API_ENDPOINT_CYBERFENCE_BASE_URL }
  );
};

export type UseDeleteScheduler = {
  onSuccess?: () => void;
};

export const useDeleteScheduler = ({
  onSuccess,
}: UseDeleteScheduler) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteScheduler,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        coreQueryKeys.reportScheduler.all('LM'),
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
