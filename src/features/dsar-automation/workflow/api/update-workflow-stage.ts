import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type UpdateWorkflowStage = {
  workflowId: string;
  stageId: string;
  data: Record<string, unknown>;
};

export const updateWorkflowStage = ({
  workflowId,
  stageId,
  data,
}: UpdateWorkflowStage): Promise<void> =>
  apiClient.post(
    `/workflow/${workflowId}/stages/${stageId}`,
    data,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );

export type UseUpdateWorkflowStage = {
  workflowId: string;
  stageId: string;
  onSuccess?: () => void;
};

export const useUpdateWorkflowStage = ({
  workflowId,
  stageId,
  onSuccess,
}: UseUpdateWorkflowStage) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateWorkflowStage({ workflowId, stageId, data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dsarAutomationQueryKeys.workflow.detail(
          workflowId
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
