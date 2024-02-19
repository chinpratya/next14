import { useMutation } from '@tanstack/react-query';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';
import { apiClient } from '@/lib/api-client';
import { dsarAutomationQueryKeys } from '@/lib/queryKeys';
import { queryClient } from '@/lib/react-query';

export const updateRequestStepNext = async (
  requestId: string
): Promise<void> => {
  return apiClient.put(
    `/request/${requestId}/next`,
    {},
    {
      baseURL: API_ENDPOINT_DSAR_AUTOMATION_BASE_URL,
    }
  );
};

export type UseUpdateRequestStepNext = {
  onSuccess?: () => void;
  requestId: string;
};

export const useUpdateRequestStepNext = ({
  onSuccess,
  requestId,
}: UseUpdateRequestStepNext) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: () => updateRequestStepNext(requestId),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        dsarAutomationQueryKeys.request.detail(requestId),
      ]);
      onSuccess?.();
    },
  });

  return {
    submit: mutate,
    isLoading,
  };
};
