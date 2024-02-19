import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteWorkflowStage = (
  workflowId: string,
  stageId: string
) =>
  apiClient.delete(
    `/workflow/${workflowId}/stages/${stageId}`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseDeleteWorkflowStage = {
  workflowId: string;
  onSuccess?: () => void;
};

export const useDeleteWorkflowStage = ({
  workflowId,
  onSuccess,
}: UseDeleteWorkflowStage) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (stageId: string) =>
      deleteWorkflowStage(workflowId, stageId),
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
