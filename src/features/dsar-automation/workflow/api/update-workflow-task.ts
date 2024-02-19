import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type UpdateWorkflowTask = {
  workflowId: string;
  taskId: string;
  stageId: string;
  data: Record<string, unknown>;
};

export const updateWorkflowTask = async ({
  workflowId,
  taskId,
  stageId,
  data,
}: UpdateWorkflowTask): Promise<void> => {
  return apiClient.put(
    `/workflow/${workflowId}/state/${stageId}/task/${taskId}`,
    data,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );
};

export type UseUpdateWorkflowTask = {
  workflowId: string;
  taskId: string;
  stageId: string;
  onSuccess?: () => void;
};

export const useUpdateWorkflowTask = ({
  workflowId,
  taskId,
  stageId,
  onSuccess,
}: UseUpdateWorkflowTask) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateWorkflowTask({
        workflowId,
        stageId,
        taskId,
        data,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dsarAutomationQueryKeys.workflow.taskDetail(
          workflowId,
          stageId,
          taskId
        ),
      ]);
      await queryClient.invalidateQueries([
        dsarAutomationQueryKeys.workflow.tasks(
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
