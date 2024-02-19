import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateTaskStatus = {
  workId: string;
  data: Record<string, unknown>;
};

export const updateTaskStatus = async ({
  workId,
  data,
}: UpdateTaskStatus): Promise<void> => {
  return apiClient.post(`/work/${workId}/status`, data, {
    baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
  });
};

export type UseUpdateTaskStatus = {
  workId: string;
  onSuccess?: () => void;
};

export const useUpdateTaskStatus = ({
  workId,
  onSuccess,
}: UseUpdateTaskStatus) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateTaskStatus({ workId, data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.task.detail(workId),
      ]);
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.task.all,
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
