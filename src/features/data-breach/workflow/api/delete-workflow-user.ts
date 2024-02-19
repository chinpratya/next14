import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteWorkflowUser = (
  workflowId: string,
  userId: string
) =>
  apiClient.delete(
    `/workflow/${workflowId}/users/${userId}`,
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );

export type UseDeleteWorkflowUser = {
  workflowId: string;
  onSuccess?: () => void;
};

export const useDeleteWorkflowUser = ({
  workflowId,
  onSuccess,
}: UseDeleteWorkflowUser) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (userId: string) =>
      deleteWorkflowUser(workflowId, userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.workflow.users(workflowId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
