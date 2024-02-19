import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const deleteWorkflow = (
  workflowId: string
): Promise<void> =>
  apiClient.delete(`/workflow/${workflowId}`, {
    baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
  });

export type UseDeleteWorkflow = {
  onSuccess?: () => void;
};

export const useDeleteWorkflow = ({
  onSuccess,
}: UseDeleteWorkflow = {}) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteWorkflow,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dataBreachQueryKeys.workflow.all,
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
