import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateTaskAssessment = (
  taskId: string,
  data: Record<string, unknown>
) =>
  apiClient.put(`/work/${taskId}/assessment`, data, {
    baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
  });

export type UseUpdateTaskAssessment = {
  taskId: string;
  onSuccess?: () => void;
};

export const useUpdateTaskAssessment = ({
  taskId,
  onSuccess,
}: UseUpdateTaskAssessment) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateTaskAssessment(taskId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.task.assessment(taskId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
