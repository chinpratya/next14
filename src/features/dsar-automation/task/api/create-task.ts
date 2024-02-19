import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export type CreateTask = {
  requestId: string;
  stateId: string;
  data: Record<string, unknown>;
};

export const createTask = ({
  requestId,
  stateId,
  data,
}: CreateTask) =>
  apiClient.post(
    `/request/${requestId}/state/${stateId}/work`,
    data,
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );

export type UseCreateTask = Omit<CreateTask, 'data'> & {
  onSuccess?: () => void;
};

export const useCreateTask = ({
  requestId,
  stateId,
  onSuccess,
}: UseCreateTask) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: Pick<CreateTask, 'data'>) =>
      createTask({ requestId, stateId, data }),
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
