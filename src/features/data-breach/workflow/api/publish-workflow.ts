import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DATA_BREACH_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dataBreachQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type PublishWorkFlow = {
  workflowId: string;
};
export const publishWorkFlow = async ({
  workflowId,
}: PublishWorkFlow): Promise<void> => {
  await apiClient.post(
    `/workflow/publish/${workflowId}`,
    {},
    {
      baseURL: API_ENDPOINT_DATA_BREACH_BASE_URL,
    }
  );
};

export type UsePublishWorkFlow = {
  onSuccess?: () => void;
  workflowId: string;
};

export const usePublishWorkFlow = ({
  onSuccess,
  workflowId,
}: UsePublishWorkFlow) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: () => publishWorkFlow({ workflowId }),
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
