import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type CreateWorkflowTask = {
  workflowId: string;
  stageId: string;
  data: Record<string, unknown>;
};

export const createWorkFlowTask = async ({
  data,
  workflowId,
  stageId,
}: CreateWorkflowTask): Promise<void> => {
  await apiClient.post(
    `/workflow/${workflowId}/state/${stageId}/task`,
    data,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );
};

export type UseCreateWorkFlowTask = {
  workflowId: string;
  stageId: string;
  onSuccess?: () => void;
};

export const useCreateWorkFlowTask = ({
  workflowId,
  stageId,
  onSuccess,
}: UseCreateWorkFlowTask) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      createWorkFlowTask({ workflowId, stageId, data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.workflow.tasks(
          workflowId,
          stageId
        ),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
