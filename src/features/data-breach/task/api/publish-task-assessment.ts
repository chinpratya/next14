import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const publishTaskAssessment = (taskId: string) =>
  apiClient.post(
    `/work/${taskId}/assessment/submit`,
    {},
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UsePublishTaskAssessment = {
  taskId: string;
  requestId?: string;
  onSuccess?: () => void;
};

export const usePublishTaskAssessment = ({
  taskId,
  requestId,
  onSuccess,
}: UsePublishTaskAssessment) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: () => publishTaskAssessment(taskId),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.task.assessment(taskId),
      ]);
      if (requestId) {
        await queryClient.invalidateQueries([
          dataBreachQueryKeys.request.detail(requestId),
        ]);
      }
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
