import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

type AddRequestTask = {
  data: Record<string, unknown>;
  requestId: string;
  stateId: string;
};

export const addRequestTask = async ({
  data,
  requestId,
  stateId,
}: AddRequestTask): Promise<void> => {
  await apiClient.post(
    `/work/${requestId}/state/${stateId}`,
    data,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );
};

export type UseAddRequestTask = {
  onSuccess?: () => void;
  requestId: string;
  stateId: string;
};

export const useAddRequestTask = ({
  onSuccess,
  requestId,
  stateId,
}: UseAddRequestTask) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      addRequestTask({ data, requestId, stateId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dsarAutomationQueryKeys.request.task(
          requestId,
          stateId
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
