import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type UpdateWorkflow = {
  workflowId: string;
  data: Record<string, unknown>;
};

export const updateWorkflow = async ({
  workflowId,
  data,
}: UpdateWorkflow): Promise<void> => {
  return apiClient.put(`/workflow/${workflowId}`, data, {
    baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
  });
};

export type UseUpdateWorkflow = {
  workflowId: string;
  onSuccess?: () => void;
};

export const useUpdateWorkflow = ({
  workflowId,
  onSuccess,
}: UseUpdateWorkflow) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      updateWorkflow({ workflowId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries([
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
