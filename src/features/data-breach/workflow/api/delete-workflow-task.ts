import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type DeleteWorkflowTask = {
  workflowId: string;
  taskId: string;
  stateId: string;
};

export const deleteWorkflowTask = ({
  workflowId,
  taskId,
  stateId,
}: DeleteWorkflowTask): Promise<void> =>
  apiClient.delete(
    `/workflow/${workflowId}/state/${stateId}/task/${taskId}`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseDeleteWorkflowTask = {
  onSuccess?: () => void;
  workflowId: string;
  stateId: string;
};

export const useDeleteWorkflowTask = ({
  onSuccess,
  workflowId,
  stateId,
}: UseDeleteWorkflowTask) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (taskId: string) =>
      deleteWorkflowTask({ workflowId, taskId, stateId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.workflow.tasks(
          workflowId,
          stateId
        ),
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
