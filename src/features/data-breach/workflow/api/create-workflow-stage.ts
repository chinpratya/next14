import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type CreateWorkflowStage = {
  workflowId: string;
  data: Record<string, unknown>;
};

export const createWorkflowStage = async ({
  workflowId,
  data,
}: CreateWorkflowStage): Promise<void> => {
  await apiClient.post(
    `/workflow/${workflowId}/stages`,
    data,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );
};

export type UseCreateWorkflowStage = {
  workflowId: string;
  onSuccess?: () => void;
};

export const useCreateWorkflowStage = ({
  workflowId,
  onSuccess,
}: UseCreateWorkflowStage) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      createWorkflowStage({ workflowId, data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.workflow.detail(workflowId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
