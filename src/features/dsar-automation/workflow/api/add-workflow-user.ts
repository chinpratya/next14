import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type AddWorkflowUser = {
  workflowId: string;
  userID: string[];
};

export const addWorkflowUser = ({
  workflowId,
  userID,
}: AddWorkflowUser) =>
  apiClient.post(
    `/workflow/${workflowId}/users`,
    {
      userID,
    },
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );

export type UseAddWorkflowUser = Pick<
  AddWorkflowUser,
  'workflowId'
> & {
  onSuccess?: () => void;
};

export const useAddWorkflowUser = ({
  workflowId,
  onSuccess,
}: UseAddWorkflowUser) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (userID: string[]) =>
      addWorkflowUser({ workflowId, userID }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dsarAutomationQueryKeys.workflow.users(
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
